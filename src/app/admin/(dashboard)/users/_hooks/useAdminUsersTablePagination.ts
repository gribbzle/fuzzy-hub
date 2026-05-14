"use client";

import { useAdminSearchParamsPagination } from "../../_hooks/useAdminSearchParamsPagination";

const FILTER_KEYS = ["search", "has_profile_type"] as const;

export function useAdminUsersTableUrlPagination() {
  return useAdminSearchParamsPagination(FILTER_KEYS);
}
