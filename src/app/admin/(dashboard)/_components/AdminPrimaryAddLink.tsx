"use client";

import type { ReactNode } from "react";

import NextLink from "next/link";

import { cn } from "@utils";

import { ADMIN_PRIMARY_BUTTON_CLASS } from "./adminTableUtils";

interface AdminPrimaryAddLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function AdminPrimaryAddLink({
  href,
  children,
  className,
}: AdminPrimaryAddLinkProps) {
  return (
    <NextLink href={href} className={cn(ADMIN_PRIMARY_BUTTON_CLASS, className)}>
      {children}
    </NextLink>
  );
}
