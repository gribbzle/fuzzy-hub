import { getAttachmentUrl } from "@portal/market/utils";

import type { BackgroundImageField } from "../_components/WidgetFormFields";
import type { WidgetFormFieldsBranchProps } from "../_components/WidgetFormFieldsBranch";

type HeroSliderSlideRow = { existing_image_id?: string | null };
type FooterSocialRow = { existing_icon_id?: string | null };

export function validateHeroSliderSlideImageCreate(
  _index: number,
  file: unknown,
): true | string {
  if (file instanceof File) {
    return true;
  }
  return "Slide image is required";
}

export function validateHeroSliderSlideImageEdit(
  index: number,
  file: unknown,
  slides: HeroSliderSlideRow[] | undefined,
): true | string {
  if (file instanceof File) {
    return true;
  }
  if (slides?.[index]?.existing_image_id) {
    return true;
  }
  return "Slide image is required";
}

export function validateAboutUsImageCreate(file: unknown): true | string {
  if (file instanceof File) {
    return true;
  }
  return "Image is required";
}

export function validateAboutUsImageEdit(
  file: unknown,
  existingImageId: string | null | undefined,
): true | string {
  if (file instanceof File) {
    return true;
  }
  if (existingImageId) {
    return true;
  }
  return "Image is required";
}

export function validateFooterSocialLinkImageCreate(
  _index: number,
  file: unknown,
): true | string {
  if (file instanceof File) {
    return true;
  }
  return "Icon image is required";
}

export function validateFooterSocialLinkImageEdit(
  index: number,
  file: unknown,
  links: FooterSocialRow[] | undefined,
): true | string {
  if (file instanceof File) {
    return true;
  }
  if (links?.[index]?.existing_icon_id) {
    return true;
  }
  return "Icon image is required";
}

function urlFromAttachmentId(id: string | null | undefined): string | null {
  if (!id) {
    return null;
  }
  return getAttachmentUrl(id);
}

export function buildWidgetFormEditImageUrlGetters(
  existingBackgroundImageIds: Record<BackgroundImageField, string | null>,
  heroSliderSlides: HeroSliderSlideRow[] | undefined,
  existingAboutUsImageId: string | null | undefined,
  footerSocialLinks: FooterSocialRow[] | undefined,
): Pick<
  WidgetFormFieldsBranchProps,
  | "getHeroSectionCurrentImageUrl"
  | "getHeroSliderSlideCurrentImageUrl"
  | "getAboutUsCurrentImageUrl"
  | "getFooterSocialLinkCurrentImageUrl"
> {
  return {
    getHeroSectionCurrentImageUrl: (key: BackgroundImageField) =>
      urlFromAttachmentId(existingBackgroundImageIds[key] ?? null),
    getHeroSliderSlideCurrentImageUrl: (index: number) =>
      urlFromAttachmentId(heroSliderSlides?.[index]?.existing_image_id ?? null),
    getAboutUsCurrentImageUrl: () =>
      urlFromAttachmentId(existingAboutUsImageId ?? null),
    getFooterSocialLinkCurrentImageUrl: (index: number) =>
      urlFromAttachmentId(footerSocialLinks?.[index]?.existing_icon_id ?? null),
  };
}
