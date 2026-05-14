"use client";

import { useState } from "react";

import { HeroSliderData } from "@portal/market/models";
import { HeroSliderItem } from "@portal/market/ui/molecules";

/**
 * Props for the HeroSlider component.
 */
interface HeroSliderProps {
  /** Data for the slider, containing slides information. */
  data: HeroSliderData;
  /** The index of the slide that should be active by default. Defaults to 0. */
  defaultActiveIndex?: number;
}

/**
 * HeroSlider component that displays a slider of hero items.
 * It manages the active state of slides based on mouse hover.
 *
 * @param props - The props for the component.
 * @returns A JSX element representing the hero section.
 */
export const HeroSlider = ({
  data: { slides },
  defaultActiveIndex = 0,
}: HeroSliderProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(defaultActiveIndex);

  return (
    <div className="hero-slider flex desktop:flex-row max-desktop:flex-col large-desktop:h-135 desktop:h-108 desktop:justify-between desktop:gap-2">
      {slides.map((item, index) => (
        <HeroSliderItem
          key={item.image_id}
          data={item}
          isActive={activeIndex === index}
          onSetActive={() => setActiveIndex(index)}
        />
      ))}
    </div>
  );
};
