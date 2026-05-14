"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";

import { TableRow } from "../ui/table";

interface AdminClickableTableRowProps {
  entityPublicId: string;
  navigateToEdit: (publicId: string, openInNewTab?: boolean) => void;
  children: ReactNode;
  className?: string;
}

export function AdminClickableTableRow({
  entityPublicId,
  navigateToEdit,
  children,
  className = "cursor-pointer hover:bg-zinc-100/80",
}: AdminClickableTableRowProps) {
  function handleClick(event: MouseEvent<HTMLTableRowElement>) {
    navigateToEdit(entityPublicId, event.ctrlKey || event.metaKey);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTableRowElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigateToEdit(entityPublicId);
    }
  }

  return (
    <TableRow
      className={className}
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </TableRow>
  );
}
