"use client";

import { AdminDictionaryItemsListResponse } from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";

import {
  buildAdminListQueryString,
  canAdminListFetch,
  isNonEmptyStringId,
} from "../_lib/adminListQueryString";

export function useAdminDictionaryItemsQuery(
  dictionaryId: string | null,
  page: number,
  limit: number,
) {
  const canFetch =
    isNonEmptyStringId(dictionaryId) && canAdminListFetch(page, limit);

  return useSWR(
    canFetch
      ? (["admin-dictionary-items", dictionaryId, page, limit] as const)
      : null,
    async ([, id, p, l]) => {
      const query = buildAdminListQueryString(p, l);
      return fetcher<AdminDictionaryItemsListResponse>(
        `/admin/dictionaries/${encodeURIComponent(
          id,
        )}/dictionary-items?${query}`,
      );
    },
  );
}
