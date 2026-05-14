import { PropsWithChildren } from "react";

import NextLink, { LinkProps as NextLinkProps } from "next/link";

import { twMerge } from "@utils";

export interface LinkProps extends NextLinkProps, PropsWithChildren {
  className?: string;
}

export const Link = ({ children, className, ...rest }: LinkProps) => (
  <NextLink
    className={twMerge(
      "text-primary hover:text-primary/80 font-bold",
      className,
    )}
    {...rest}
  >
    {children}
  </NextLink>
);
