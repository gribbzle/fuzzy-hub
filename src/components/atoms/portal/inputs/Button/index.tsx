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

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  tertiary: "btn-tertiary",
};

const sizeClasses: Record<ButtonSize, string> = {
  mini: "btn-mini",
  small: "btn-small",
  medium: "btn-medium",
  large: "btn-large",
};

const getButtonClasses = ({
  variant = "primary",
  size = "large",
  fullWidth = false,
  className,
}: ButtonBaseProps) =>
  twMerge(
    "btn",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className,
  );

const ButtonInner = ({
  children,
  slotProps,
}: {
  children: ReactNode;
  slotProps?: ButtonBaseProps["slotProps"];
}) => <span className={slotProps?.text?.className}>{children}</span>;

export interface ButtonProps
  extends
    ButtonBaseProps,
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {}

export const Button = ({
  variant,
  size,
  children,
  className,
  fullWidth,
  slotProps,
  ...rest
}: ButtonProps) => (
  <button
    className={getButtonClasses({ variant, size, fullWidth, className })}
    {...rest}
  >
    <ButtonInner slotProps={slotProps}>{children}</ButtonInner>
  </button>
);

export interface ButtonLinkProps
  extends ButtonBaseProps, Omit<NextLinkProps, "href"> {
  href?: string | null;
  children?: ReactNode;
}

export const ButtonLink = ({
  variant,
  size,
  children,
  className,
  fullWidth,
  href,
  slotProps,
  ...rest
}: ButtonLinkProps) => (
  <NextLink
    className={getButtonClasses({ variant, size, fullWidth, className })}
    href={href ?? "#"}
    {...rest}
  >
    <ButtonInner slotProps={slotProps}>{children}</ButtonInner>
  </NextLink>
);
