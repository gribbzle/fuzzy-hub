import type { WidgetType } from "@/app/admin/(dashboard)/_models";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";

import {
  type BackgroundImageField,
  emptyBackgroundImages,
} from "../_components/WidgetFormShared";

export interface WidgetFormSlide {
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  background_mode: string;
  image: File | null;
  existing_image_id?: string | null;
}

export interface WidgetFormFooterLink {
  name: string;
  url: string;
}

export interface WidgetFormFooterLinkBlock {
  title: string;
  links: WidgetFormFooterLink[];
}

export interface WidgetFormFooterSocialLink {
  icon: File | null;
  existing_icon_id?: string | null;
  url: string;
}

export interface WidgetFormValues {
  is_active: boolean;
  type: WidgetType;
  hero_section: {
    title: string;
    subtitle: string;
    cta_text: string;
    cta_link: string;
    background_images: Record<BackgroundImageField, File | null>;
  };
  hero_slider: {
    slides: WidgetFormSlide[];
  };
  about_us: {
    title: string;
    content: string;
    image: File | null;
    existing_image_id?: string | null;
  };
  contact_us: {
    title: string;
    email: string;
    phone: string;
    address: string;
  };
  footer: {
    contact_info: string;
    copyright_info: string;
    link_blocks: WidgetFormFooterLinkBlock[];
    social_links: WidgetFormFooterSocialLink[];
  };
}

export type WidgetFormControl = Control<WidgetFormValues>;
export type WidgetFormRegister = UseFormRegister<WidgetFormValues>;
export type WidgetFormErrors = FieldErrors<WidgetFormValues>;

export const createEmptyHeroSliderSlide = (): WidgetFormSlide => ({
  title: "",
  subtitle: "",
  cta_text: "",
  cta_link: "",
  background_mode: "",
  image: null,
  existing_image_id: null,
});

export const createEmptyFooterLink = (): WidgetFormFooterLink => ({
  name: "",
  url: "",
});

export const createEmptyFooterLinkBlock = (): WidgetFormFooterLinkBlock => ({
  title: "",
  links: [createEmptyFooterLink()],
});

export const createEmptyFooterSocialLink = (): WidgetFormFooterSocialLink => ({
  icon: null,
  existing_icon_id: null,
  url: "",
});

export const createDefaultWidgetFormValues = (): WidgetFormValues => ({
  is_active: true,
  type: "hero_section",
  hero_section: {
    title: "",
    subtitle: "",
    cta_text: "",
    cta_link: "",
    background_images: { ...emptyBackgroundImages },
  },
  hero_slider: {
    slides: [createEmptyHeroSliderSlide()],
  },
  about_us: {
    title: "",
    content: "",
    image: null,
    existing_image_id: null,
  },
  contact_us: {
    title: "",
    email: "",
    phone: "",
    address: "",
  },
  footer: {
    contact_info: "",
    copyright_info: "",
    link_blocks: [createEmptyFooterLinkBlock()],
    social_links: [createEmptyFooterSocialLink()],
  },
});
