import { ElementType, PropsWithChildren } from "react";

import { twMerge } from "@utils";

type TypographyVariant =
  | "body1"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "caption"
  | "subtitle";

const TYPOGRAPHY_CONFIG: Record<
  TypographyVariant,
  { tag: ElementType; className: string }
> = {
  h1: {
    tag: "h1",
    className:
      "font-fredoka text-32 font-medium text-text-default max-desktop:text-28 max-tablet:text-20 max-tablet:leading-6",
  },
  h2: {
    tag: "h2",
    className:
      "font-fredoka font-medium text-text-default large-desktop:text-44 tablet:text-32 max-tablet:text-24 max-tablet:bold",
  },
  h3: {
    tag: "h3",
    className: "font-fredoka text-24 font-medium text-text-default",
  },
  h4: {
    tag: "h4",
    className: "text-20 font-bold text-text-default translate-y-px",
  },
  h5: {
    tag: "h5",
    className: "text-20 font-bold text-text-default",
  },
  h6: {
    tag: "h6",
    className: "font-fredoka text-64 font-medium text-text-default",
  },
  caption: {
    tag: "p",
    className: "text-16 font-normal text-text-default",
  },
  body1: {
    tag: "p",
    className: "text-16 font-normal text-text-default",
  },
  subtitle: {
    tag: "p",
    className: "text-18 text-text-secondary font-semibold",
  },
} as const;

interface TypographyProps extends PropsWithChildren {
  variant?: TypographyVariant;
  className?: string;
  component?: ElementType;
}

export const Typography = ({
  variant = "body1",
  children,
  className,
  component,
}: TypographyProps) => {
  const { tag, className: defaultClassName } = TYPOGRAPHY_CONFIG[variant];

  const Component = component ?? tag;

  return (
    <Component className={twMerge(defaultClassName, className)}>
      {children}
    </Component>
  );
};
