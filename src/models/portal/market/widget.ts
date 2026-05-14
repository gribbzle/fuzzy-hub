export type WidgetType =
  | "hero_section"
  | "hero_slider"
  | "about_us"
  | "contact_us"
  | "footer";

export type WidgetGroup = "main_page";

export interface HeroSectionData {
  title: string;
  subtitle: string;
  background_image_id_mobile: string | null;
  background_image_id_tablet: string | null;
  background_image_id_desktop: string | null;
  background_image_id_large_desktop: string | null;
  cta_text?: string | null;
  cta_link?: string | null;
}

export interface HeroSliderSlide {
  title: string;
  subtitle: string;
  image_id: string;
  background_mode?: string | null;
  cta_text?: string | null;
  cta_link?: string | null;
}

export interface HeroSliderData {
  slides: HeroSliderSlide[];
}

export interface AboutUsData {
  title: string;
  content: string;
  image_id?: string | null;
  cta_text?: string | null;
  cta_link?: string | null;
}

export interface ContactUsData {
  title: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  map_latitude?: number | null;
  map_longitude?: number | null;
}

interface Link {
  name: string;
  url: string;
}

interface LinkBlock {
  title: string;
  links: Link[];
}

interface SocialLink {
  icon_id: string;
  url: string;
}

export interface FooterData {
  contact_info: string;
  copyright_info: string;
  link_blocks: LinkBlock[];
  social_links: SocialLink[];
}

export type WidgetData =
  | HeroSectionData
  | HeroSliderData
  | AboutUsData
  | ContactUsData
  | FooterData;

export interface WidgetResource {
  id: string;
  type: WidgetType;
  data: WidgetData;
  created_at: string;
  updated_at: string;
}

export interface AboutUsResource extends WidgetResource {
  type: "about_us";
  data: AboutUsData;
}

export interface HeroSliderResource extends WidgetResource {
  type: "hero_slider";
  data: HeroSliderData;
}

export interface HeroSectionResource extends WidgetResource {
  type: "hero_section";
  data: HeroSectionData;
}

export interface ContactUsResource extends WidgetResource {
  type: "contact_us";
  data: ContactUsData;
}

export interface FooterResource extends WidgetResource {
  type: "footer";
  data: FooterData;
}

export interface WidgetListResource<T = WidgetResource> {
  items: T[];
  total: number;
}

export interface WidgetsParams {
  group?: WidgetGroup;
  type?: WidgetType;
}
