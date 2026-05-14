"use client";

import { AdminUsersListResponse } from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";

import {
  buildAdminListQueryString,
  canAdminListFetch,
} from "../_lib/adminListQueryString";

interface AdminUsersQueryFilters {
  search?: string;
  has_profile_type?: string;
}

export function useAdminUsersQuery(
  page: number,
  limit: number,
  filters?: AdminUsersQueryFilters,
) {
  const canFetch = canAdminListFetch(page, limit);
  const search = filters?.search?.trim() ?? "";
  const has_profile_type = filters?.has_profile_type?.trim() ?? "";

  return useSWR(
    canFetch
      ? (["admin-users", page, limit, search, has_profile_type] as const)
      : null,
    async ([, p, l, s, hpt]) => {
      const query = buildAdminListQueryString(p, l, {
        search: s,
        has_profile_type: hpt,
      });
      return fetcher<AdminUsersListResponse>(`/admin/users?${query}`);
    },
  );
}
