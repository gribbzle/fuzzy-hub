"use client";

import { useAdminSearchParamsPagination } from "../../_hooks/useAdminSearchParamsPagination";

const FILTER_KEYS = ["search", "type", "group"] as const;

export function useAdminCharacteristicsTableUrlPagination() {
  return useAdminSearchParamsPagination(FILTER_KEYS);
}
