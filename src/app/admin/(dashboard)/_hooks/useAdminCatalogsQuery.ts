"use client";

import { AdminCatalogsListResponse } from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";

import {
  buildAdminListQueryString,
  canAdminListFetch,
} from "../_lib/adminListQueryString";

interface AdminCatalogsQueryFilters {
  search?: string;
}

export function useAdminCatalogsQuery(
  page: number,

  limit: number,

  filters?: AdminCatalogsQueryFilters,
) {
  const canFetch = canAdminListFetch(page, limit);

  const search = filters?.search?.trim() ?? "";

  return useSWR(
    canFetch ? (["admin-catalogs", page, limit, search] as const) : null,

    async ([, p, l, s]) => {
      const query = buildAdminListQueryString(p, l, { search: s });

      return fetcher<AdminCatalogsListResponse>(`/admin/catalogs?${query}`);
    },
  );
}
