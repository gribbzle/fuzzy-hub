"use client";

import { AdminUserProfileDetailResponse } from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";

import { isNonEmptyStringId } from "../_lib/adminListQueryString";

export function useAdminUserProfileQuery(
  userId: string | null,
  profileId: string | null,
) {
  const canFetch = isNonEmptyStringId(userId) && isNonEmptyStringId(profileId);

  return useSWR(
    canFetch ? (["admin-user-profile", userId, profileId] as const) : null,
    async ([, uid, pid]) =>
      fetcher<AdminUserProfileDetailResponse>(
        `/admin/users/${encodeURIComponent(uid)}/profiles/${encodeURIComponent(pid)}`,
      ),
  );
}
