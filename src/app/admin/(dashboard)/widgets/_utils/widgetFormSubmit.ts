import { redirectAdminOnUnauthorized } from "@/utils/adminApiAuth";
import { getAuthHeadersForClient } from "@/utils/authCookie";
import { API_BASE_URL } from "@constants";
import type {
  FieldValues,
  UseFormClearErrors,
  UseFormSetError,
} from "react-hook-form";

import {
  type BackgroundImageField,
  backgroundImageConfigs,
} from "../_components/WidgetFormShared";
import {
  applyWidgetServerValidationErrors,
  getWidgetServerErrorMessage,
} from "./serverValidation";
import type { WidgetFormValues } from "./widgetFormTypes";

export function appendWidgetFormMeta(
  formData: FormData,
  values: WidgetFormValues,
) {
  formData.append("is_active", values.is_active ? "1" : "0");
  formData.append("type", values.type);
}

export const BACKGROUND_IMAGE_DATA_FIELD_BY_FILE_FIELD: Record<
  BackgroundImageField,
  string
> = {
  background_image_large_desktop: "background_image_id_large_desktop",
  background_image_desktop: "background_image_id_desktop",
  background_image_tablet: "background_image_id_tablet",
  background_image_mobile: "background_image_id_mobile",
};

interface BuildHeroSectionFormDataOptions {
  values: WidgetFormValues;
  existingBackgroundImageIds?: Partial<
    Record<BackgroundImageField, string | null>
  >;
  backgroundImageDataFieldByFileField?: Record<BackgroundImageField, string>;
}

export const buildHeroSectionFormData = ({
  values,
  existingBackgroundImageIds,
  backgroundImageDataFieldByFileField,
}: BuildHeroSectionFormDataOptions) => {
  const formData = new FormData();
  appendWidgetFormMeta(formData, values);
  formData.append("data[title]", values.hero_section.title);
  formData.append("data[subtitle]", values.hero_section.subtitle);
  formData.append("data[cta_text]", values.hero_section.cta_text);
  formData.append("data[cta_link]", values.hero_section.cta_link);

  backgroundImageConfigs.forEach(({ key }) => {
    const file = values.hero_section.background_images[key];
    if (file) {
      formData.append(`files[${key}]`, file);
      return;
    }

    if (!existingBackgroundImageIds || !backgroundImageDataFieldByFileField) {
      return;
    }

    const existingImageId = existingBackgroundImageIds[key];
    if (!existingImageId) {
      return;
    }

    const dataField = backgroundImageDataFieldByFileField[key];
    formData.append(`data[${dataField}]`, existingImageId);
  });

  return formData;
};

export const buildHeroSliderFormData = (
  values: WidgetFormValues,
  preserveExistingImageIds: boolean,
) => {
  const formData = new FormData();
  appendWidgetFormMeta(formData, values);

  values.hero_slider.slides.forEach((slide, index) => {
    formData.append(`data[slides][${index}][title]`, slide.title);
    formData.append(`data[slides][${index}][subtitle]`, slide.subtitle);
    formData.append(`data[slides][${index}][cta_text]`, slide.cta_text);
    formData.append(`data[slides][${index}][cta_link]`, slide.cta_link);
    formData.append(
      `data[slides][${index}][background_mode]`,
      slide.background_mode,
    );

    if (slide.image) {
      formData.append(`files[slides.${index}]`, slide.image);
      return;
    }

    if (preserveExistingImageIds && slide.existing_image_id) {
      formData.append(
        `data[slides][${index}][image_id]`,
        slide.existing_image_id,
      );
    }
  });

  return formData;
};

export const buildAboutUsFormData = (
  values: WidgetFormValues,
  preserveExistingImageId: boolean,
) => {
  const formData = new FormData();
  appendWidgetFormMeta(formData, values);
  formData.append("data[title]", values.about_us.title);
  formData.append("data[content]", values.about_us.content);

  if (values.about_us.image) {
    formData.append("files[image]", values.about_us.image);
  } else if (preserveExistingImageId && values.about_us.existing_image_id) {
    formData.append("data[image_id]", values.about_us.existing_image_id);
  }

  return formData;
};

export const buildContactUsFormData = (values: WidgetFormValues) => {
  const formData = new FormData();
  appendWidgetFormMeta(formData, values);
  formData.append("data[title]", values.contact_us.title);
  formData.append("data[email]", values.contact_us.email);
  formData.append("data[phone]", values.contact_us.phone);
  formData.append("data[address]", values.contact_us.address);

  return formData;
};

export const buildFooterFormData = (values: WidgetFormValues) => {
  const formData = new FormData();
  appendWidgetFormMeta(formData, values);
  formData.append("data[contact_info]", values.footer.contact_info);
  formData.append("data[copyright_info]", values.footer.copyright_info);

  values.footer.link_blocks.forEach((block, blockIndex) => {
    formData.append(`data[link_blocks][${blockIndex}][title]`, block.title);

    block.links.forEach((link, linkIndex) => {
      formData.append(
        `data[link_blocks][${blockIndex}][links][${linkIndex}][name]`,
        link.name,
      );
      formData.append(
        `data[link_blocks][${blockIndex}][links][${linkIndex}][url]`,
        link.url,
      );
    });
  });

  values.footer.social_links.forEach((link, index) => {
    formData.append(`data[social_links][${index}][url]`, link.url);

    if (link.icon) {
      formData.append(`files[social_links.${index}.icon]`, link.icon);
      return;
    }

    if (link.existing_icon_id) {
      formData.append(
        `data[social_links][${index}][icon_id]`,
        link.existing_icon_id,
      );
    }
  });

  return formData;
};

export type WidgetFormSubmitMode = "create" | "edit";

export function buildWidgetFormSubmission(
  values: WidgetFormValues,
  options: {
    mode: WidgetFormSubmitMode;
    widgetId?: string;
    existingBackgroundImageIds?: Record<BackgroundImageField, string | null>;
  },
): { path: string; method: "POST" | "PATCH"; formData: FormData } {
  const { mode, widgetId, existingBackgroundImageIds } = options;
  const isEdit = mode === "edit";

  if (isEdit && !widgetId) {
    throw new Error("widgetId is required for edit submissions");
  }

  const patchPath = `/admin/widgets/${encodeURIComponent(widgetId ?? "")}`;

  switch (values.type) {
    case "hero_section": {
      if (isEdit) {
        return {
          path: patchPath,
          method: "PATCH",
          formData: buildHeroSectionFormData({
            values,
            existingBackgroundImageIds,
            backgroundImageDataFieldByFileField:
              BACKGROUND_IMAGE_DATA_FIELD_BY_FILE_FIELD,
          }),
        };
      }
      return {
        path: "/admin/widgets",
        method: "POST",
        formData: buildHeroSectionFormData({ values }),
      };
    }
    case "hero_slider": {
      const formData = buildHeroSliderFormData(values, isEdit);
      return isEdit
        ? { path: patchPath, method: "PATCH", formData }
        : { path: "/admin/widgets", method: "POST", formData };
    }
    case "about_us": {
      const formData = buildAboutUsFormData(values, isEdit);
      return isEdit
        ? { path: patchPath, method: "PATCH", formData }
        : { path: "/admin/widgets", method: "POST", formData };
    }
    case "contact_us": {
      const formData = buildContactUsFormData(values);
      return isEdit
        ? { path: patchPath, method: "PATCH", formData }
        : { path: "/admin/widgets", method: "POST", formData };
    }
    case "footer": {
      const formData = buildFooterFormData(values);
      return isEdit
        ? { path: patchPath, method: "PATCH", formData }
        : { path: "/admin/widgets", method: "POST", formData };
    }
  }
}

interface SubmitWidgetRequestOptions<TFormValues extends FieldValues> {
  path: string;
  method: "POST" | "PATCH";
  formData: FormData;
  fallbackErrorMessage: string;
  clearErrors: UseFormClearErrors<TFormValues>;
  setError: UseFormSetError<TFormValues>;
  setSubmitError: (value: string | null) => void;
}

export const submitWidgetRequest = async <TFormValues extends FieldValues>({
  path,
  method,
  formData,
  fallbackErrorMessage,
  clearErrors,
  setError,
  setSubmitError,
}: SubmitWidgetRequestOptions<TFormValues>) => {
  setSubmitError(null);
  clearErrors();

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        Accept: "application/json",
        ...getAuthHeadersForClient(),
      },
      body: formData,
    });
  } catch {
    setSubmitError(fallbackErrorMessage);
    return false;
  }

  if (!response.ok) {
    if (redirectAdminOnUnauthorized(response, path)) {
      return false;
    }
    const error = await response.json().catch(() => ({}));
    applyWidgetServerValidationErrors<TFormValues>(error, setError);
    setSubmitError(getWidgetServerErrorMessage(error, fallbackErrorMessage));
    return false;
  }

  return true;
};
