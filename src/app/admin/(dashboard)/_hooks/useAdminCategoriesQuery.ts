"use client";

import { AdminCategoriesListResponse } from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";

import {
  buildAdminListQueryString,
  canAdminListFetch,
} from "../_lib/adminListQueryString";

interface AdminCategoriesQueryFilters {
  search?: string;
}

export function useAdminCategoriesQuery(
  page: number,
  limit: number,
  filters?: AdminCategoriesQueryFilters,
) {
  const canFetch = canAdminListFetch(page, limit);
  const search = filters?.search?.trim() ?? "";

  return useSWR(
    canFetch ? (["admin-categories", page, limit, search] as const) : null,
    async ([, p, l, s]) => {
      const query = buildAdminListQueryString(p, l, { search: s });
      return fetcher<AdminCategoriesListResponse>(`/admin/categories?${query}`);
    },
  );
}
