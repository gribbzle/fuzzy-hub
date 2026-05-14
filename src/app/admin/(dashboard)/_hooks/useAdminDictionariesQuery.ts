"use client";

import { AdminDictionariesListResponse } from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";

import {
  buildAdminListQueryString,
  canAdminListFetch,
} from "../_lib/adminListQueryString";

interface AdminDictionariesQueryFilters {
  search?: string;
  name?: string;
  slug?: string;
}

export function useAdminDictionariesQuery(
  page: number,
  limit: number,
  filters?: AdminDictionariesQueryFilters,
) {
  const canFetch = canAdminListFetch(page, limit);
  const search = filters?.search?.trim() ?? "";
  const name = filters?.name?.trim() ?? "";
  const slug = filters?.slug?.trim() ?? "";

  return useSWR(
    canFetch
      ? (["admin-dictionaries", page, limit, search, name, slug] as const)
      : null,
    async ([, p, l, s, n, sl]) => {
      const query = buildAdminListQueryString(p, l, {
        search: s,
        name: n,
        slug: sl,
      });
      return fetcher<AdminDictionariesListResponse>(
        `/admin/dictionaries?${query}`,
      );
    },
  );
}
