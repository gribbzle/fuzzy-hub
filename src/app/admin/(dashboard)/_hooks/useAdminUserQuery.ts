"use client";

import { AdminUserDetailResponse } from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";

import { isNonEmptyStringId } from "../_lib/adminListQueryString";

export function useAdminUserQuery(userId: string | null) {
  return useSWR(
    isNonEmptyStringId(userId) ? (["admin-user", userId] as const) : null,
    async ([, id]) =>
      fetcher<AdminUserDetailResponse>(
        `/admin/users/${encodeURIComponent(id)}`,
      ),
  );
}
