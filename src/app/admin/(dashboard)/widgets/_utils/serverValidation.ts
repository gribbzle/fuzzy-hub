import { getResponseErrorMessage } from "@/utils/apiResponseError";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";

type UnknownRecord = Record<string, unknown>;

const HERO_SECTION_FIELDS = new Set([
  "title",
  "subtitle",
  "cta_text",
  "cta_link",
]);
const HERO_SLIDER_FIELDS = new Set([
  "title",
  "subtitle",
  "cta_text",
  "cta_link",
  "background_mode",
]);
const ABOUT_US_FIELDS = new Set(["title", "content"]);
const CONTACT_US_FIELDS = new Set(["title", "email", "phone", "address"]);
const FOOTER_FIELDS = new Set(["contact_info", "copyright_info"]);
const HERO_SECTION_ONLY_FIELDS = new Set(["subtitle", "cta_text", "cta_link"]);
const CONTACT_US_ONLY_FIELDS = new Set(["email", "phone", "address"]);
const ABOUT_US_ONLY_FIELDS = new Set(["content", "image", "image_id"]);
const FOOTER_ONLY_FIELDS = new Set([
  "contact_info",
  "copyright_info",
  "link_blocks",
  "social_links",
]);

type ValidationScope =
  | "hero_section"
  | "hero_slider"
  | "about_us"
  | "contact_us"
  | "footer"
  | "unknown";

const getFirstValidationMessage = (value: unknown): string | null => {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    const firstString = value.find((entry) => typeof entry === "string");
    return typeof firstString === "string" ? firstString : null;
  }

  return null;
};

const inferValidationScope = (payloadData: UnknownRecord): ValidationScope => {
  const keys = Object.keys(payloadData)
    .filter((key) => key !== "message")
    .map((key) => (key.startsWith("data.") ? key.slice(5) : key));

  if (keys.some((key) => /^slides\.\d+\./.test(key))) {
    return "hero_slider";
  }

  if (keys.some((key) => ABOUT_US_ONLY_FIELDS.has(key))) {
    return "about_us";
  }

  if (keys.some((key) => CONTACT_US_ONLY_FIELDS.has(key))) {
    return "contact_us";
  }

  if (keys.some((key) => FOOTER_ONLY_FIELDS.has(key))) {
    return "footer";
  }

  if (keys.some((key) => HERO_SECTION_ONLY_FIELDS.has(key))) {
    return "hero_section";
  }

  return "unknown";
};

const mapValidationKeyToWidgetFields = (
  rawKey: string,
  scope: ValidationScope,
): string[] => {
  const normalizedKey = rawKey.startsWith("data.") ? rawKey.slice(5) : rawKey;

  if (normalizedKey === "title") {
    if (scope === "about_us") {
      return ["about_us.title"];
    }
    if (scope === "contact_us") {
      return ["contact_us.title"];
    }
    if (scope === "hero_section") {
      return ["hero_section.title"];
    }
    if (scope === "footer") {
      return ["footer.link_blocks.0.title"];
    }

    return ["hero_section.title", "about_us.title", "contact_us.title"];
  }

  if (ABOUT_US_FIELDS.has(normalizedKey)) {
    return [`about_us.${normalizedKey}`];
  }

  if (normalizedKey === "image_id" || normalizedKey === "image") {
    return ["about_us.image"];
  }

  if (CONTACT_US_FIELDS.has(normalizedKey)) {
    return [`contact_us.${normalizedKey}`];
  }

  if (FOOTER_FIELDS.has(normalizedKey)) {
    return [`footer.${normalizedKey}`];
  }

  if (HERO_SECTION_FIELDS.has(normalizedKey)) {
    return [`hero_section.${normalizedKey}`];
  }

  const footerLinkBlockTitleMatch = normalizedKey.match(
    /^link_blocks\.(\d+)\.title$/,
  );
  if (footerLinkBlockTitleMatch) {
    const [, blockIndex] = footerLinkBlockTitleMatch;
    return [`footer.link_blocks.${blockIndex}.title`];
  }

  const footerLinkMatch = normalizedKey.match(
    /^link_blocks\.(\d+)\.links\.(\d+)\.(name|url)$/,
  );
  if (footerLinkMatch) {
    const [, blockIndex, linkIndex, field] = footerLinkMatch;
    return [`footer.link_blocks.${blockIndex}.links.${linkIndex}.${field}`];
  }

  const footerSocialLinkMatch = normalizedKey.match(
    /^social_links\.(\d+)\.(icon_id|url)$/,
  );
  if (footerSocialLinkMatch) {
    const [, socialIndex, field] = footerSocialLinkMatch;
    if (field === "icon_id") {
      return [`footer.social_links.${socialIndex}.icon`];
    }

    return [`footer.social_links.${socialIndex}.${field}`];
  }

  const slideMatch = normalizedKey.match(/^slides\.(\d+)\.([a-z_]+)$/);
  if (!slideMatch) {
    return [];
  }

  const [, index, field] = slideMatch;
  if (field === "image_id" || field === "image") {
    return [`hero_slider.slides.${index}.image`];
  }

  if (!HERO_SLIDER_FIELDS.has(field)) {
    return [];
  }

  return [`hero_slider.slides.${index}.${field}`];
};

export const applyWidgetServerValidationErrors = <
  TFieldValues extends FieldValues,
>(
  errorPayload: unknown,
  setError: UseFormSetError<TFieldValues>,
) => {
  if (
    !errorPayload ||
    typeof errorPayload !== "object" ||
    !("data" in errorPayload)
  ) {
    return false;
  }

  const data = (errorPayload as UnknownRecord).data;
  if (!data || typeof data !== "object") {
    return false;
  }

  let applied = false;
  const dataObject = data as UnknownRecord;
  const scope = inferValidationScope(dataObject);

  Object.entries(dataObject).forEach(([key, value]) => {
    if (key === "message") {
      return;
    }

    const fieldPaths = mapValidationKeyToWidgetFields(key, scope);
    const message = getFirstValidationMessage(value);
    if (fieldPaths.length === 0 || !message) {
      return;
    }

    fieldPaths.forEach((fieldPath) => {
      setError(fieldPath as Path<TFieldValues>, {
        type: "server",
        message,
      });
    });
    applied = true;
  });

  return applied;
};

export const getWidgetServerErrorMessage = (
  errorPayload: unknown,
  fallbackMessage: string,
) => {
  if (errorPayload && typeof errorPayload === "object") {
    const typedPayload = errorPayload as UnknownRecord;
    if (
      typeof typedPayload.message === "string" &&
      typedPayload.message.length > 0
    ) {
      return typedPayload.message;
    }
  }
  return getResponseErrorMessage(errorPayload, fallbackMessage);
};
