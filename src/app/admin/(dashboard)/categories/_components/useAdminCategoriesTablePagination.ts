"use client";

import { useAdminSearchParamsPagination } from "../../_hooks/useAdminSearchParamsPagination";

const FILTER_KEYS = ["search"] as const;

export function useAdminCategoriesTableUrlPagination() {
  return useAdminSearchParamsPagination(FILTER_KEYS);
}
