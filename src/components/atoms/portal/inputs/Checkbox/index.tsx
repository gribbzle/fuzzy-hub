import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

import { twMerge } from "@utils";

import { Check } from "@portal/ui/icons";

export interface CheckboxProps extends DetailedHTMLProps<
  Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
  HTMLInputElement
> {
  size?: "small" | "large";
}

export const Checkbox = ({
  size = "small",
  className,
  ...rest
}: CheckboxProps): React.JSX.Element => (
  <label
    className={twMerge(
      "relative flex cursor-pointer items-center justify-center",
      size === "small" && "py-0.5",
    )}
  >
    <input
      type="checkbox"
      className={twMerge(
        "peer border-text-light box-border shrink-0 cursor-pointer appearance-none rounded transition-colors",
        "hover:border-aqua-green",
        "disabled:bg-bg-light disabled:border-border-light disabled:opacity-50",
        "checked:bg-aqua-green checked:border-aqua-green",
        size === "small" && "h-5 w-5 border my-px",
        size === "large" && "h-6 w-6 border-2",
        className,
      )}
      {...rest}
    />
    <Check className="absolute h-full w-full text-white opacity-0 peer-checked:opacity-100" />
  </label>
);
