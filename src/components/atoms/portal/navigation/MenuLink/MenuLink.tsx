import React, { ReactNode } from "react";

import NextLink from "next/link";

import { twMerge } from "@utils";

interface MenuLinkProps {
  children?: ReactNode | undefined;
  IconStart?: ReactNode;
  IconEnd?: ReactNode;
  className?: string;
  href?: string;
  prefetch?: boolean;
}

export const MenuLink = ({
  children,
  IconStart,
  IconEnd,
  className,
  href = "#",
  prefetch = true,
}: MenuLinkProps) => (
  <NextLink
    href={href}
    className={twMerge(
      "flex items-center text-text-default hover:text-primary-hovered active:text-primary-pressed text-16 large-desktop:text-20 w-fit shrink-0 large-desktop:gap-2.5 gap-1.5 font-semibold",
      className,
    )}
    prefetch={prefetch}
  >
    {IconStart}
    <span className="shrink-0 max-large-desktop:-translate-y-px">
      {children}
    </span>
    {IconEnd}
  </NextLink>
);
