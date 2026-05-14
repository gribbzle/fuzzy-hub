import * as React from "react";

import { cn } from "@utils";

// TODO: убрать зависимость от market
import { ArrowLeft, ArrowRight } from "@portal/ui/icons";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<"button">, "disabled" | "onClick" | "children"> &
  Omit<React.ComponentProps<"button">, "type">;

const paginationLinkBaseClassName =
  "inline-flex h-8 min-w-8 items-center justify-center rounded-md p-0 text-xs font-medium transition-colors [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0";

const PaginationLink = ({
  className,
  isActive,
  children,
  ...props
}: PaginationLinkProps) => {
  if (isActive) {
    return (
      <span
        aria-current="page"
        className={cn(
          paginationLinkBaseClassName,
          "cursor-default select-none border border-zinc-200 bg-white",
          className,
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <button
      type="button"
      className={cn(
        paginationLinkBaseClassName,
        "cursor-pointer hover:bg-zinc-100 hover:text-zinc-900",
        "focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn(
      "border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900",
      "gap-1 px-2 sm:px-2.5",
      className,
    )}
    {...props}
  >
    <ArrowLeft className="size-4" />
    <span className="hidden sm:inline">Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn(
      "border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900",
      "gap-1 px-2 sm:px-2.5",
      className,
    )}
    {...props}
  >
    <span className="hidden sm:inline">Next</span>
    <ArrowRight className="size-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn(
      "flex h-8 w-8 items-center justify-center text-zinc-500",
      className,
    )}
    {...props}
  >
    <span className="sr-only">More pages</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

/** Page indices and ellipsis for shadcn-style pagination (7+ pages collapse with …). */
export function getPaginationPageItems(
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  }
  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }
  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ];
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
