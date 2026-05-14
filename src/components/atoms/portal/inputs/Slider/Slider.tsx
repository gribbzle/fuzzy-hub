"use client";

import { ComponentProps } from "react";

import RCSlider from "rc-slider";
import "rc-slider/assets/index.css";

type SliderProps = ComponentProps<typeof RCSlider>;

export const Slider = ({ styles, ...rest }: SliderProps) => (
  <RCSlider
    styles={{
      rail: {
        backgroundColor: "#D9D9D9",
        height: 4,
      },
      track: {
        backgroundColor: "#6AD0C8",
        height: 4,
      },
      handle: {
        opacity: 1,
        width: 20,
        height: 20,
        border: "3px solid #6AD0C8",
        backgroundColor: "#FFFFFF",
        marginTop: -8,
      },
      ...styles,
    }}
    {...rest}
  />
);
