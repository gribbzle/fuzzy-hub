"use client";

import { AdminQuizProfilesListResponse } from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";

import {
  buildAdminListQueryString,
  canAdminListFetch,
} from "../_lib/adminListQueryString";

export function useAdminQuizProfilesQuery(page: number, limit: number) {
  const canFetch = canAdminListFetch(page, limit);

  return useSWR(
    canFetch ? (["admin-quiz-profiles", page, limit] as const) : null,
    async ([, p, l]) => {
      const query = buildAdminListQueryString(p, l);
      return fetcher<AdminQuizProfilesListResponse>(
        `/admin/quiz-profiles?${query}`,
      );
    },
  );
}
