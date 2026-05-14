"use client";

import { useEffect, useMemo } from "react";

import { getPaginationPageItems } from "../_components/ui/pagination";

interface UseAdminLocalListPaginationArgs {
  /** True once the list payload is available (e.g. `Boolean(swrResponse?.data)`). */
  hasListData: boolean;
  total: number;
  page: number;
  setPage: (nextPage: number) => void;
  limit: number;
}

export function useAdminLocalListPagination({
  hasListData,
  total,
  page,
  setPage,
  limit,
}: UseAdminLocalListPaginationArgs) {
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / limit)),
    [limit, total],
  );

  const pageForDisplay = useMemo(() => {
    if (!hasListData) {
      return page;
    }
    if (total === 0) {
      return 1;
    }
    return Math.min(Math.max(1, page), totalPages);
  }, [hasListData, page, total, totalPages]);

  useEffect(() => {
    if (hasListData && pageForDisplay !== page) {
      setPage(pageForDisplay);
    }
  }, [hasListData, page, pageForDisplay, setPage]);

  const rangeStart = total === 0 ? 0 : (pageForDisplay - 1) * limit + 1;
  const rangeEnd = Math.min(pageForDisplay * limit, total);
  const canPrev = pageForDisplay > 1;
  const canNext = pageForDisplay < totalPages;
  const pageItems = useMemo(
    () => getPaginationPageItems(pageForDisplay, totalPages),
    [pageForDisplay, totalPages],
  );

  return {
    pageForDisplay,
    totalPages,
    rangeStart,
    rangeEnd,
    canPrev,
    canNext,
    pageItems,
  };
}
