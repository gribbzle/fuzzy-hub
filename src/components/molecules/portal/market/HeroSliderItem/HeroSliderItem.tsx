import { memo } from "react";

import { twMerge } from "@utils";

import { AttachmentImage, Box, ButtonLink } from "@portal/ui/atoms";

import { HeroSliderSlide } from "@portal/market/models";

/**
 * Props for the HeroSliderItem component.
 */
export interface HeroSliderItemProps {
  /** The slide data including title, subtitle, image, and CTA details. */
  data: HeroSliderSlide;
  /** Additional CSS classes for custom styling. */
  className?: string;
  /** Whether the slide is currently active in the slider. */
  isActive?: boolean;
  /** Callback function triggered when the mouse enters the slide area. */
  onSetActive: () => void;
}

/**
 * HeroSliderItem component represents an individual slide within the hero slider.
 * It displays a title, subtitle, background image, and an optional call-to-action button.
 * The component changes its appearance and visibility of content based on the `isActive` state.
 *
 * @param props - The properties for the component.
 * @returns A JSX element representing the slider item.
 */
export const HeroSliderItem = memo(
  ({
    data: { title, subtitle, image_id, cta_link, cta_text },
    className,
    isActive,
    onSetActive,
  }: HeroSliderItemProps) => (
    <div
      className={twMerge(
        "hero-slider-slide relative flex flex-col justify-between overflow-hidden transition-all duration-400",
        "desktop:rounded-3xl max-desktop:rounded-t-3xl max-desktop:last:rounded-3xl max-desktop:not-first:-mt-6",
        isActive
          ? "grow-0 large-desktop:basis-122 desktop:basis-84 tablet:basis-208 max-tablet:basis-152.5 before:opacity-100"
          : "grow large-desktop:basis-72.5 desktop:basis-49.5 tablet:basis-37 max-tablet:basis-28",
        className,
      )}
      onMouseEnter={onSetActive}
    >
      <Box
        className={twMerge(
          "z-1 h-full gap-5 large-desktop:p-9 desktop:p-8 max-tablet:px-4",
          isActive &&
            "large-desktop:pr-14.75 desktop:pr-9 max-desktop:tablet:pl-6 max-desktop:tablet:pr-36.75 max-desktop:tablet:py-8 max-tablet:py-6",
          !isActive &&
            "max-large-desktop:desktop:px-6 max-desktop:tablet:px-6.5 max-desktop:tablet:py-13.5 max-tablet:py-10",
        )}
      >
        <div className="flex justify-center">
          <p
            className={twMerge(
              "font-fredoka large-desktop:whitespace-break-spaces text-shadow-4xs text-white large-desktop:text-32 desktop:text-24 tablet:text-32 max-tablet:text-24 font-medium",
              !isActive && "text-center",
            )}
          >
            {title}
          </p>
          <div
            className={twMerge(
              "transition-grow grow-0 duration-400 ease-in-out max-desktop:grow",
              isActive && "grow",
            )}
          />
        </div>
        <Box
          className={twMerge(
            "transition-duration translate-y-3 gap-5 opacity-0 duration-400 items-stretch",
            isActive && "translate-y-0 opacity-100",
          )}
        >
          <Box className="gap-2 max-large-desktop:desktop:-translate-y-px">
            {subtitle.split("\n").map((line, i) => (
              <p
                key={i}
                className="text-shadow-3xs font-semibold text-white large-desktop:text-18 desktop:text-16 tablet:text-18 max-tablet:text-16"
              >
                {line}
              </p>
            ))}
          </Box>
          {!!cta_text && (
            <ButtonLink
              href={cta_link}
              variant="tertiary"
              className="large-desktop:btn-medium desktop:btn-small tablet:btn-large max-tablet:btn-medium"
              prefetch={false}
              slotProps={{
                text: {
                  className: "only-tablet:translate-y-px",
                },
              }}
            >
              {cta_text}
            </ButtonLink>
          )}
        </Box>
      </Box>
      <div
        className={twMerge(
          "absolute bottom-0 right-0 left-0 flex justify-center items-center",
          "large-desktop:h-74 desktop:h-51",
          !isActive &&
            "max-desktop:top-0 max-desktop:left-auto max-desktop:w-24.5 max-tablet:w-19.5 max-desktop:right-6.5 max-tablet:right-4",
          isActive &&
            "max-desktop:top-auto max-desktop:h-170 max-tablet:h-96.5",
        )}
      >
        <AttachmentImage
          imageId={image_id}
          alt=""
          aria-hidden="true"
          width={290}
          height={296}
          loading="eager"
          className={twMerge(
            "absolute object-cover",
            "large-desktop:h-74 large-desktop:w-72.5 desktop:h-51 desktop:w-49.5",
            !isActive &&
              "max-desktop:h-25 max-desktop:w-24.5 max-tablet:h-20 max-tablet:w-19.5",
            isActive &&
              "max-desktop:w-165 max-desktop:h-170 max-tablet:w-93.75 max-tablet:h-96.5",
          )}
        />
      </div>
    </div>
  ),
);

HeroSliderItem.displayName = "HeroSliderItem";
