import { ReactNode } from "react";

import { twMerge } from "@utils";

export interface IconButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  size?: "mini" | "small" | "medium" | "large";
  variant?: "default" | "primary" | "secondary";
  transparent?: boolean;
}

export const CircleButton = ({
  disabled = false,
  size = "medium",
  children,
  variant = "default",
  transparent = false,
  ...rest
}: IconButtonProps) => (
  <button
    disabled={disabled}
    className={twMerge(
      "box-border flex w-fit shrink-0 cursor-pointer items-center justify-center rounded-full transition-all",
      size === "mini" && "h-8 w-8",
      size === "small" && "h-10 w-10",
      size === "medium" && "h-11 w-11",
      size === "large" && "h-14 w-14",
      variant === "default" &&
        "hover:text-primary-hover active:text-primary-active",
      variant === "primary" &&
        "border-border-gray border bg-white hover:border-0 hover:bg-[#FFDEC2] active:border-0 active:bg-[#FFC99D]",
      variant === "secondary" &&
        "shadow-button hover:border-secondary active:border-secondary bg-white hover:border active:border-[1.5px]",
      transparent && "bg-transparent",
    )}
    {...rest}
  >
    {children}
  </button>
);
