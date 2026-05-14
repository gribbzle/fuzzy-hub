"use client";

import { AdminCharacteristicsListResponse } from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";

import {
  buildAdminListQueryString,
  canAdminListFetch,
} from "../_lib/adminListQueryString";

interface AdminCharacteristicsQueryFilters {
  search?: string;
  type?: string;
  group?: string;
}

export function useAdminCharacteristicsQuery(
  page: number,
  limit: number,
  filters?: AdminCharacteristicsQueryFilters,
) {
  const canFetch = canAdminListFetch(page, limit);
  const search = filters?.search?.trim() ?? "";
  const type = filters?.type?.trim() ?? "";
  const group = filters?.group?.trim() ?? "";

  return useSWR(
    canFetch
      ? (["admin-characteristics", page, limit, search, type, group] as const)
      : null,
    async ([, p, l, s, t, g]) => {
      const query = buildAdminListQueryString(p, l, {
        search: s,
        type: t,
        group: g,
      });
      return fetcher<AdminCharacteristicsListResponse>(
        `/admin/characteristics?${query}`,
      );
    },
  );
}
