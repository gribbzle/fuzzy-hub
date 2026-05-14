export const backgroundImageConfigs = [
  { key: "background_image_mobile", label: "Mobile", resolution: "<=767px" },
  { key: "background_image_tablet", label: "Tablet", resolution: "768-1279px" },
  {
    key: "background_image_desktop",
    label: "Desktop",
    resolution: "1280-1919px",
  },
  {
    key: "background_image_large_desktop",
    label: "Large desktop",
    resolution: ">=1920px",
  },
] as const;

export type BackgroundImageField =
  (typeof backgroundImageConfigs)[number]["key"];

export const emptyBackgroundImages: Record<BackgroundImageField, File | null> =
  {
    background_image_large_desktop: null,
    background_image_desktop: null,
    background_image_tablet: null,
    background_image_mobile: null,
  };
