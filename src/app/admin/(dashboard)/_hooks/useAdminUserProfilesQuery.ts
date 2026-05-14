"use client";

import { AdminUserProfilesListResponse } from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";

import {
  buildAdminListQueryString,
  canAdminListFetch,
  isNonEmptyStringId,
} from "../_lib/adminListQueryString";

interface AdminUserProfilesQueryFilters {
  search?: string;
  type?: string;
  approved?: string;
}

export function useAdminUserProfilesQuery(
  userId: string | null,
  page: number,
  limit: number,
  filters?: AdminUserProfilesQueryFilters,
) {
  const canFetch = isNonEmptyStringId(userId) && canAdminListFetch(page, limit);
  const search = filters?.search?.trim() ?? "";
  const type = filters?.type?.trim() ?? "";
  const approved = filters?.approved?.trim() ?? "";

  return useSWR(
    canFetch
      ? ([
          "admin-user-profiles",
          userId,
          page,
          limit,
          search,
          type,
          approved,
        ] as const)
      : null,
    async ([, uid, p, l, s, ty, ap]) => {
      const query = buildAdminListQueryString(p, l, {
        search: s,
        type: ty,
        approved: ap,
      });
      return fetcher<AdminUserProfilesListResponse>(
        `/admin/users/${encodeURIComponent(uid)}/profiles?${query}`,
      );
    },
  );
}
