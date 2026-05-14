import React from "react";

import {
  AttachmentImage,
  Box,
  ButtonLink,
  Container,
  Typography,
} from "@portal/ui/atoms";

import { AboutUsData } from "@portal/market/models";

/**
 * Props for the {@link AboutUs} component.
 */
export interface AboutUsProps {
  /**
   * The data for the "About Us" section, including title, content, image, and CTA details.
   */
  data: AboutUsData;
  /**
   * Additional CSS classes for custom styling.
   */
  className?: string;
}

/**
 * AboutUs component displays a section with information about the company or marketplace.
 * It includes a title, descriptive content, an image, and an optional call-to-action button.
 *
 * @param props - The properties for the component.
 * @returns A JSX element representing the about us section.
 */
export const AboutUs = ({
  data: { title, content, cta_text, cta_link, image_id },
  className,
}: AboutUsProps) => (
  <Container component="section" className={className}>
    <div className="bg-bg-light relative flex overflow-hidden rounded-4xl large-desktop:pl-15 large-desktop:pr-128.75 large-desktop:py-20 desktop:pl-12 desktop:pr-118 tablet:pl-9 tablet:pr-18.25 tablet:py-8 max-tablet:p-6 large-desktop:min-h-137.5 desktop:min-h-113 tablet:min-h-178 max-tablet:min-h-155.5">
      <Box className="w-full gap-11 max-tablet:gap-6">
        <Box className="large-desktop:gap-8 tablet:gap-6 max-tablet:gap-4">
          <Typography
            variant="h2"
            className="line-clamp-1 overflow-hidden overflow-ellipsis"
          >
            {title}
          </Typography>
          <Box className="large-desktop:gap-3 gap-2 max-tablet:-translate-y-px">
            {content.split("\n").map((line, i) => (
              <p
                key={i}
                className="large-desktop:text-24 tablet:text-20 max-tablet:text-16 text-text-secondary z-1 font-semibold whitespace-pre-line"
              >
                {line}
              </p>
            ))}
          </Box>
        </Box>
        {!!cta_text && (
          <ButtonLink
            href={cta_link}
            variant="primary"
            className="btn-medium large-desktop:btn-large max-tablet:btn-small"
          >
            {cta_text}
          </ButtonLink>
        )}
      </Box>
      {image_id && (
        <div className="absolute right-0 max-tablet:right-6 bottom-0 large-desktop:w-121 large-desktop:h-123.5 desktop:w-102 desktop:h-104 tablet:w-95 tablet:h-97 max-tablet:w-60.75 max-tablet:h-62">
          <AttachmentImage
            imageId={image_id}
            alt={title}
            fill
            sizes="(min-width: 1919px) 484px, (min-width: 1279px) 408px, (min-width: 767px) 380px, 243px"
          />
        </div>
      )}
    </div>
  </Container>
);
