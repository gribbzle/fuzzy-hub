import React from "react";

import {
  ArtDirectionImage,
  Box,
  ButtonLink,
  Typography,
} from "@portal/ui/atoms";

/**
 * Props for the {@link Banner} component.
 */
export interface BannerProps {
  href?: string;
}

/**
 * @param props - The properties for the component.
 * @returns A JSX element representing the banner.
 */
export const Banner = ({ href = "#" }: BannerProps) => (
  <div className="relative overflow-hidden rounded-4xl bg-[#EDE4F4] large-desktop:px-15 large-desktop:py-11 large-desktop:h-73 desktop:py-9 desktop:px-12 desktop:h-62 tablet:h-80 tablet:p-9 max-tablet:h-87 max-tablet:py-6 max-tablet:pl-6 max-tablet:pr-5.5">
    <Box className="z-1 w-full gap-5 large-desktop:max-w-144.5 desktop:max-w-95">
      <Box className="gap-4 max-tablet:gap-5">
        <Typography variant="h2">Not sure where to start?</Typography>
        <Typography
          variant="subtitle"
          className="max-large-desktop:text-16 large-desktop:font-semibold font-medium max-tablet:text-14"
        >
          Take our quick matching quiz and discover the best fit for you.
        </Typography>
      </Box>
      <ButtonLink
        className="large-desktop:max-w-70 large-desktop:btn-large desktop:btn-medium desktop:max-w-55 tablet:max-w-50 max-tablet:btn-small max-tablet:max-w-35"
        variant="tertiary"
        fullWidth
        href={href}
      >
        Start quiz
      </ButtonLink>
    </Box>
    <div className="absolute right-0 desktop:top-0 bottom-0 large-desktop:w-255.5 desktop:w-164.5 tablet:w-122.5 max-desktop:h-45 max-tablet:h-40 max-tablet:left-0">
      <ArtDirectionImage
        src={{
          mobile: "/images/banner-search/background-375.png",
          tablet: "/images/banner-search/background-768.png",
          desktop: "/images/banner-search/background-1280.png",
          largeDesktop: "/images/banner-search/background-1920.png",
        }}
      />
    </div>
  </div>
);
