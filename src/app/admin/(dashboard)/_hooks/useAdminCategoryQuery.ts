"use client";

import { AdminCategoryResponse } from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";

import { isNonEmptyStringId } from "../_lib/adminListQueryString";

export function useAdminCategoryQuery(categoryId: string | null) {
  return useSWR(
    isNonEmptyStringId(categoryId)
      ? (["admin-category", categoryId] as const)
      : null,
    async ([, id]) =>
      fetcher<AdminCategoryResponse>(
        `/admin/categories/${encodeURIComponent(id)}`,
      ),
  );
}
