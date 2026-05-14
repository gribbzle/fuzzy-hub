"use client";

import { useAdminSearchParamsPagination } from "../../_hooks/useAdminSearchParamsPagination";

const FILTER_KEYS = ["search", "name", "slug"] as const;

export function useAdminDictionariesTableUrlPagination() {
  return useAdminSearchParamsPagination(FILTER_KEYS);
}
