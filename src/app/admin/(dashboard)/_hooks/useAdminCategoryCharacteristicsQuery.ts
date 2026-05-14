"use client";

import { AdminCategoryCharacteristicsListResponse } from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";
import { SWRResponse } from "swr";

import {
  buildAdminListQueryString,
  canAdminListFetch,
  isNonEmptyStringId,
} from "../_lib/adminListQueryString";

export function useAdminCategoryCharacteristicsQuery(
  categoryId: string,
  page: number,
  limit: number,
): SWRResponse<AdminCategoryCharacteristicsListResponse, Error> {
  const canFetch =
    isNonEmptyStringId(categoryId) && canAdminListFetch(page, limit);
  return useSWR<AdminCategoryCharacteristicsListResponse, Error>(
    canFetch
      ? (["admin-category-characteristics", categoryId, page, limit] as const)
      : null,
    async ([, publicId, p, l]: readonly [string, string, number, number]) => {
      const query = buildAdminListQueryString(p, l);
      return fetcher<AdminCategoryCharacteristicsListResponse>(
        `/admin/categories/${encodeURIComponent(publicId)}/characteristics?${query}`,
      );
    },
  );
}
