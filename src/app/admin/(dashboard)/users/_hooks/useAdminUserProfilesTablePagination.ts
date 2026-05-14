"use client";

import { useAdminSearchParamsPagination } from "../../_hooks/useAdminSearchParamsPagination";

const FILTER_KEYS = ["search", "type", "approved"] as const;

export function useAdminUserProfilesTableUrlPagination() {
  return useAdminSearchParamsPagination(FILTER_KEYS);
}
