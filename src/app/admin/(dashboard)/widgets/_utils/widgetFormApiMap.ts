import type { WidgetType } from "@/app/admin/(dashboard)/_models";

import type { BackgroundImageField } from "../_components/WidgetFormShared";
import {
  type WidgetFormValues,
  createDefaultWidgetFormValues,
  createEmptyFooterLink,
  createEmptyFooterLinkBlock,
  createEmptyFooterSocialLink,
  createEmptyHeroSliderSlide,
} from "./widgetFormTypes";

export function parseExistingBackgroundImageIds(
  loadedData: Record<string, unknown> | undefined,
): Record<BackgroundImageField, string | null> {
  return {
    background_image_large_desktop:
      typeof loadedData?.background_image_id_large_desktop === "string"
        ? loadedData.background_image_id_large_desktop
        : null,
    background_image_desktop:
      typeof loadedData?.background_image_id_desktop === "string"
        ? loadedData.background_image_id_desktop
        : null,
    background_image_tablet:
      typeof loadedData?.background_image_id_tablet === "string"
        ? loadedData.background_image_id_tablet
        : null,
    background_image_mobile:
      typeof loadedData?.background_image_id_mobile === "string"
        ? loadedData.background_image_id_mobile
        : null,
  };
}

export function mapLoadedApiDataToWidgetFormValues(
  loadedType: WidgetType,
  isActive: boolean,
  loadedData: Record<string, unknown> | undefined,
): WidgetFormValues {
  const defaults = createDefaultWidgetFormValues();

  return {
    is_active: Boolean(isActive),
    type: loadedType,
    hero_section:
      loadedType === "hero_section"
        ? {
            title:
              typeof loadedData?.title === "string" ? loadedData.title : "",
            subtitle:
              typeof loadedData?.subtitle === "string"
                ? loadedData.subtitle
                : "",
            cta_text:
              typeof loadedData?.cta_text === "string"
                ? loadedData.cta_text
                : "",
            cta_link:
              typeof loadedData?.cta_link === "string"
                ? loadedData.cta_link
                : "",
            background_images: defaults.hero_section.background_images,
          }
        : {
            title: "",
            subtitle: "",
            cta_text: "",
            cta_link: "",
            background_images: defaults.hero_section.background_images,
          },
    hero_slider:
      loadedType === "hero_slider"
        ? {
            slides:
              Array.isArray(loadedData?.slides) && loadedData.slides.length > 0
                ? loadedData.slides.map((slide) => {
                    const typedSlide =
                      slide && typeof slide === "object"
                        ? (slide as Record<string, unknown>)
                        : {};

                    return {
                      title:
                        typeof typedSlide.title === "string"
                          ? typedSlide.title
                          : "",
                      subtitle:
                        typeof typedSlide.subtitle === "string"
                          ? typedSlide.subtitle
                          : "",
                      cta_text:
                        typeof typedSlide.cta_text === "string"
                          ? typedSlide.cta_text
                          : "",
                      cta_link:
                        typeof typedSlide.cta_link === "string"
                          ? typedSlide.cta_link
                          : "",
                      background_mode:
                        typeof typedSlide.background_mode === "string"
                          ? typedSlide.background_mode
                          : "",
                      image: null,
                      existing_image_id:
                        typeof typedSlide.image_id === "string"
                          ? typedSlide.image_id
                          : null,
                    };
                  })
                : [createEmptyHeroSliderSlide()],
          }
        : {
            slides: [createEmptyHeroSliderSlide()],
          },
    about_us:
      loadedType === "about_us"
        ? {
            title:
              typeof loadedData?.title === "string" ? loadedData.title : "",
            content:
              typeof loadedData?.content === "string" ? loadedData.content : "",
            image: null,
            existing_image_id:
              typeof loadedData?.image_id === "string"
                ? loadedData.image_id
                : null,
          }
        : defaults.about_us,
    contact_us:
      loadedType === "contact_us"
        ? {
            title:
              typeof loadedData?.title === "string" ? loadedData.title : "",
            email:
              typeof loadedData?.email === "string" ? loadedData.email : "",
            phone:
              typeof loadedData?.phone === "string" ? loadedData.phone : "",
            address:
              typeof loadedData?.address === "string" ? loadedData.address : "",
          }
        : defaults.contact_us,
    footer:
      loadedType === "footer"
        ? {
            contact_info:
              typeof loadedData?.contact_info === "string"
                ? loadedData.contact_info
                : "",
            copyright_info:
              typeof loadedData?.copyright_info === "string"
                ? loadedData.copyright_info
                : "",
            link_blocks:
              Array.isArray(loadedData?.link_blocks) &&
              loadedData.link_blocks.length > 0
                ? loadedData.link_blocks.map((block) => {
                    const typedBlock =
                      block && typeof block === "object"
                        ? (block as Record<string, unknown>)
                        : {};
                    const linksSource = typedBlock.links;

                    return {
                      title:
                        typeof typedBlock.title === "string"
                          ? typedBlock.title
                          : "",
                      links:
                        Array.isArray(linksSource) && linksSource.length > 0
                          ? linksSource.map((link) => {
                              const typedLink =
                                link && typeof link === "object"
                                  ? (link as Record<string, unknown>)
                                  : {};

                              return {
                                name:
                                  typeof typedLink.name === "string"
                                    ? typedLink.name
                                    : "",
                                url:
                                  typeof typedLink.url === "string"
                                    ? typedLink.url
                                    : "",
                              };
                            })
                          : [createEmptyFooterLink()],
                    };
                  })
                : [createEmptyFooterLinkBlock()],
            social_links:
              Array.isArray(loadedData?.social_links) &&
              loadedData.social_links.length > 0
                ? loadedData.social_links.map((socialLink) => {
                    const typedSocialLink =
                      socialLink && typeof socialLink === "object"
                        ? (socialLink as Record<string, unknown>)
                        : {};

                    return {
                      icon: null,
                      existing_icon_id:
                        typeof typedSocialLink.icon_id === "string"
                          ? typedSocialLink.icon_id
                          : null,
                      url:
                        typeof typedSocialLink.url === "string"
                          ? typedSocialLink.url
                          : "",
                    };
                  })
                : [createEmptyFooterSocialLink()],
          }
        : defaults.footer,
  };
}
