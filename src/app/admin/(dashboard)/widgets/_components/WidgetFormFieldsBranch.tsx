"use client";

import type { WidgetType } from "@/app/admin/(dashboard)/_models";

import {
  AboutUsContentFields,
  type BackgroundImageField,
  ContactUsContentFields,
  FooterContentFields,
  HeroSectionContentFields,
  HeroSliderContentFields,
} from "./WidgetFormFields";

export interface WidgetFormFieldsBranchProps {
  selectedType: WidgetType;
  heroSliderSlideFields: Array<{ id: string }>;
  onAddHeroSliderSlide: () => void;
  onRemoveHeroSliderSlide: (index: number) => void;
  selectedBackgroundImages:
    | Record<BackgroundImageField, File | null>
    | undefined;
  selectedImagePreviewUrls: Record<BackgroundImageField, string | null>;
  onHeroBackgroundImageChange: (
    key: BackgroundImageField,
    file: File | null,
  ) => void;
  getHeroSectionCurrentImageUrl?: (key: BackgroundImageField) => string | null;
  heroSliderImagePreviewUrls: (string | null)[];
  onHeroSliderSlideImageChange: (index: number, file: File | null) => void;
  getHeroSliderSlideCurrentImageUrl?: (index: number) => string | null;
  validateHeroSliderSlideImage: (
    index: number,
    file: File | null,
  ) => true | string;
  aboutUsImagePreviewUrl: string | null;
  onAboutUsImageChange: (file: File | null) => void;
  getAboutUsCurrentImageUrl?: () => string | null;
  validateAboutUsImage: (file: File | null) => true | string;
  footerSocialImagePreviewUrls: (string | null)[];
  onFooterSocialLinkImageChange: (index: number, file: File | null) => void;
  onFooterSocialLinkRemove: (index: number) => void;
  getFooterSocialLinkCurrentImageUrl?: (index: number) => string | null;
  validateFooterSocialLinkImage: (
    index: number,
    file: File | null,
  ) => true | string;
}

export function WidgetFormFieldsBranch({
  selectedType,
  heroSliderSlideFields,
  onAddHeroSliderSlide,
  onRemoveHeroSliderSlide,
  selectedBackgroundImages,
  selectedImagePreviewUrls,
  onHeroBackgroundImageChange,
  getHeroSectionCurrentImageUrl,
  heroSliderImagePreviewUrls,
  onHeroSliderSlideImageChange,
  getHeroSliderSlideCurrentImageUrl,
  validateHeroSliderSlideImage,
  aboutUsImagePreviewUrl,
  onAboutUsImageChange,
  getAboutUsCurrentImageUrl,
  validateAboutUsImage,
  footerSocialImagePreviewUrls,
  onFooterSocialLinkImageChange,
  onFooterSocialLinkRemove,
  getFooterSocialLinkCurrentImageUrl,
  validateFooterSocialLinkImage,
}: WidgetFormFieldsBranchProps) {
  return (
    <>
      {selectedType === "hero_section" ? (
        <HeroSectionContentFields
          selectedBackgroundImages={selectedBackgroundImages}
          selectedImagePreviewUrls={selectedImagePreviewUrls}
          onBackgroundImageChange={onHeroBackgroundImageChange}
          getCurrentImageUrl={getHeroSectionCurrentImageUrl}
        />
      ) : null}
      {selectedType === "hero_slider" ? (
        <HeroSliderContentFields
          heroSliderSlideFields={heroSliderSlideFields}
          slideImagePreviewUrls={heroSliderImagePreviewUrls}
          onAddSlide={onAddHeroSliderSlide}
          onRemoveSlide={onRemoveHeroSliderSlide}
          onSlideImageChange={onHeroSliderSlideImageChange}
          getSlideCurrentImageUrl={getHeroSliderSlideCurrentImageUrl}
          validateSlideImage={validateHeroSliderSlideImage}
        />
      ) : null}
      {selectedType === "about_us" ? (
        <AboutUsContentFields
          aboutImagePreviewUrl={aboutUsImagePreviewUrl}
          onImageChange={onAboutUsImageChange}
          getCurrentImageUrl={getAboutUsCurrentImageUrl}
          validateImage={validateAboutUsImage}
        />
      ) : null}
      {selectedType === "contact_us" ? <ContactUsContentFields /> : null}
      {selectedType === "footer" ? (
        <FooterContentFields
          socialLinkImagePreviewUrls={footerSocialImagePreviewUrls}
          onSocialLinkImageChange={onFooterSocialLinkImageChange}
          onSocialLinkRemove={onFooterSocialLinkRemove}
          getSocialLinkCurrentImageUrl={getFooterSocialLinkCurrentImageUrl}
          validateSocialLinkImage={validateFooterSocialLinkImage}
        />
      ) : null}
    </>
  );
}
