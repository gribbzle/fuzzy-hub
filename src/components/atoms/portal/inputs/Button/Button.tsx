import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

import NextLink, { LinkProps as NextLinkProps } from "next/link";

import { twMerge } from "@utils";

type ButtonSize = "mini" | "small" | "medium" | "large";
type ButtonVariant = "primary" | "secondary" | "tertiary";

interface ButtonBaseProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
  slotProps?: {
    text?: {
      className?: string;
    };
  };
}

export interface ButtonProps
  extends
    ButtonBaseProps,
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {}

const variantClasses = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  tertiary: "btn-tertiary",
};

const sizeClasses = {
  mini: "btn-mini",
  small: "btn-small",
  medium: "btn-medium",
  large: "btn-large",
};

export const Button = ({
  variant = "primary",
  size = "large",
  children,
  className,
  fullWidth = false,
  ...rest
}: ButtonProps) => (
  <button
    className={twMerge(
      "btn",
      variantClasses[variant],
      sizeClasses[size],
      fullWidth && "w-full",
      className,
    )}
    {...rest}
  >
    <span>{children}</span>
  </button>
);

export interface ButtonLinkProps
  extends ButtonBaseProps, Omit<NextLinkProps, "href"> {
  href?: string | null;
  children?: ReactNode;
}

export const ButtonLink = ({
  variant = "primary",
  children,
  className,
  fullWidth = false,
  href,
  slotProps,
  ...rest
}: ButtonLinkProps) => (
  <NextLink
    className={twMerge(
      "btn btn-medium",
      variantClasses[variant],
      fullWidth && "w-full",
      className,
    )}
    href={href ?? "#"}
    {...rest}
  >
    <span className={slotProps?.text?.className}>{children}</span>
  </NextLink>
);
