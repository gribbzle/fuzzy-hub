"use client";

import React from "react";

import NextLink from "next/link";

import { twMerge } from "@utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: string;
}

export const Breadcrumbs = ({
  items,
  className,
  separator = "/",
}: BreadcrumbsProps) => (
  <nav
    aria-label="Breadcrumbs"
    className={twMerge("flex items-center", className)}
  >
    <ol className="flex items-center gap-2">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const itemClassName = twMerge(
          "text-18",
          isLast
            ? "font-medium text-[#757577]"
            : "font-bold text-text-default hover:text-primary",
        );

        const content =
          item.href && !isLast ? (
            <NextLink href={item.href} className={itemClassName}>
              {item.label}
            </NextLink>
          ) : (
            <span
              className={itemClassName}
              {...(isLast ? { "aria-current": "page" } : {})}
            >
              {item.label}
            </span>
          );

        return (
          <React.Fragment key={`${item.label}-${index}`}>
            <li className="flex items-center">{content}</li>
            {!isLast && (
              <li
                aria-hidden="true"
                className="text-18 text-text-default font-semibold"
              >
                {separator}
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ol>
  </nav>
);
