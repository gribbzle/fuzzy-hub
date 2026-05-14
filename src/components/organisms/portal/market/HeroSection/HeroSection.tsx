import React from "react";

import { twMerge } from "@utils";

import {
  ArtDirectionImage,
  Box,
  ButtonLink,
  Typography,
} from "@portal/ui/atoms";

import { HeroSectionData } from "@portal/market/models";

/**
 * Props for the {@link HeroSection} component.
 */
interface HeroSectionProps {
  /**
   * The data for the hero section, including title, subtitle, and call-to-action details.
   */
  data: HeroSectionData;
  /**
   * Additional CSS classes for custom styling.
   */
  className?: string;
}

/**
 * HeroSection component displays a prominent section at the top of a page.
 * It features a title, a subtitle, a background image, and an optional call-to-action button.
 *
 * @param props - The properties for the component.
 * @returns A JSX element representing the hero section.
 */
export const HeroSection = ({
  data: {
    title,
    subtitle,
    cta_text,
    cta_link,
    background_image_id_mobile,
    background_image_id_tablet,
    background_image_id_desktop,
    background_image_id_large_desktop,
  },
  className,
}: HeroSectionProps) => (
  <Box
    className={twMerge(
      "relative items-center large-desktop:pt-45 max-w-480 mx-auto w-full large-desktop:h-134.5 desktop:pt-40 desktop:h-116.25 tablet:h-200 tablet:pt-39 max-tablet:pt-16.25 max-tablet:h-150",
      className,
    )}
  >
    <Box className="z-10 justify-center large-desktop:gap-8 max-large-desktop:gap-6 large-desktop:max-w-165.25 tablet:max-w-114 w-full max-tablet:px-4">
      <Typography
        component="h1"
        className="font-fredoka large-desktop:text-64 tablet:text-44 max-tablet:text-32 font-medium text-text-default text-center"
      >
        {title}
      </Typography>
      <p className="large-desktop:text-24 tablet:text-20 max-tablet:text-18 text-text-secondary text-center tablet:font-semibold max-tablet:font-normal">
        {subtitle}
      </p>
      {!!cta_text && (
        <ButtonLink
          href={cta_link}
          variant="primary"
          className="mx-auto large-desktop:btn-large tablet:btn-medium max-tablet:btn-small"
        >
          {cta_text}
        </ButtonLink>
      )}
    </Box>
    <div className="absolute top-0 left-0 right-0 bottom-0">
      {background_image_id_mobile &&
        background_image_id_tablet &&
        background_image_id_desktop &&
        background_image_id_large_desktop && (
          <ArtDirectionImage
            src={{
              mobile: background_image_id_mobile,
              tablet: background_image_id_tablet,
              desktop: background_image_id_desktop,
              largeDesktop: background_image_id_large_desktop,
            }}
          />
        )}
    </div>
  </Box>
);
