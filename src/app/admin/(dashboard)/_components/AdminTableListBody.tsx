"use client";

import type { ReactNode } from "react";

import { TableCell, TableRow } from "./ui/table";

interface AdminTableListBodyProps {
  colSpan: number;
  isLoading: boolean;
  isEmpty: boolean;
  loadingMessage?: string;
  emptyMessage?: string;
  children: ReactNode;
}

export function AdminTableListBody({
  colSpan,
  isLoading,
  isEmpty,
  loadingMessage = "Loading...",
  emptyMessage = "No results.",
  children,
}: AdminTableListBodyProps) {
  if (isLoading && isEmpty) {
    return (
      <TableRow>
        <TableCell colSpan={colSpan} className="h-24 text-center text-zinc-500">
          {loadingMessage}
        </TableCell>
      </TableRow>
    );
  }

  if (isEmpty) {
    return (
      <TableRow>
        <TableCell colSpan={colSpan} className="h-24 text-center text-zinc-500">
          {emptyMessage}
        </TableCell>
      </TableRow>
    );
  }

  return <>{children}</>;
}
