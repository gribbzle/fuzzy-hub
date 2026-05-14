"use client";

import { useEffect } from "react";

/**
 * When `searchDraft` differs from the URL-backed `searchFromUrl`, debounce then
 * call `setQuery(1, limit, { search: searchDraft })`.
 */
export function useAdminDebouncedUrlSearchSync(
  searchDraft: string,
  searchFromUrl: string,
  limit: number,
  setQuery: (
    nextPage: number,
    nextLimit: number,
    nextFilters?: Partial<{ search: string }>,
  ) => void,
  delayMs = 350,
) {
  useEffect(() => {
    const nextSearch = searchDraft.trim();
    const currentSearch = searchFromUrl.trim();
    if (nextSearch === currentSearch) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setQuery(1, limit, { search: searchDraft.trim() });
    }, delayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [delayMs, limit, searchDraft, searchFromUrl, setQuery]);
}
