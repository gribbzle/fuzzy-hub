"use client";

import { useEffect, useMemo } from "react";

import { getPaginationPageItems } from "./ui/pagination";

/** Supports optional filter merge on navigation-heavy tables */
export type AdminTableSetQuery = (
  nextPage: number,
  nextLimit: number,
  nextFilters?: Partial<Record<string, string>>,
) => void;

export function useAdminTablePaginationDerived(
  listPayload: { total: number } | null | undefined,
  page: number,
  limit: number,
  setQuery: AdminTableSetQuery,
) {
  const total = listPayload?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const rangeStart = total === 0 ? 0 : (page - 1) * limit + 1;
  const rangeEnd = Math.min(page * limit, total);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const pageItems = useMemo(
    () => getPaginationPageItems(page, totalPages),
    [page, totalPages],
  );

  useEffect(() => {
    if (listPayload == null) {
      return;
    }
    if (total === 0 && page > 1) {
      setQuery(1, limit);
      return;
    }
    if (total > 0 && page > totalPages) {
      setQuery(totalPages, limit);
    }
  }, [listPayload, limit, page, setQuery, total, totalPages]);

  return {
    total,
    totalPages,
    rangeStart,
    rangeEnd,
    canPrev,
    canNext,
    pageItems,
  };
}
