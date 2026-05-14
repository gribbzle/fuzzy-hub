import { DetailedHTMLProps, InputHTMLAttributes } from "react";

import { twMerge } from "@utils";

export type RadioProps = DetailedHTMLProps<
  Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
  HTMLInputElement
> & {
  size?: "small" | "large";
};

export const Radio = ({ size = "small", className, ...rest }: RadioProps) => (
  <input
    type="radio"
    className={twMerge(`radio transition-all ${size}`, className)}
    {...rest}
  />
);
