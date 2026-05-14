"use client";

import { AdminCharacteristicResponse } from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";

import { isNonEmptyStringId } from "../_lib/adminListQueryString";

export function useAdminCharacteristicQuery(characteristicId: string | null) {
  return useSWR(
    isNonEmptyStringId(characteristicId)
      ? (["admin-characteristic", characteristicId] as const)
      : null,
    async ([, id]) =>
      fetcher<AdminCharacteristicResponse>(
        `/admin/characteristics/${encodeURIComponent(id)}`,
      ),
  );
}
