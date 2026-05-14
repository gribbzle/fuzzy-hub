"use client";

import {
  AdminDictionary,
  FetcherResponse,
} from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";

import { isNonEmptyStringId } from "../_lib/adminListQueryString";

export function useAdminDictionaryQuery(dictionaryId: string | null) {
  return useSWR(
    isNonEmptyStringId(dictionaryId)
      ? (["admin-dictionary", dictionaryId] as const)
      : null,
    async ([, id]) =>
      fetcher<FetcherResponse<AdminDictionary>>(
        `/admin/dictionaries/${encodeURIComponent(id)}`,
      ),
  );
}
