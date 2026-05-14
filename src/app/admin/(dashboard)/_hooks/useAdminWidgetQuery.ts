"use client";

import {
  AdminWidgetItem,
  FetcherResponse,
} from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";

import { isNonEmptyStringId } from "../_lib/adminListQueryString";

export function useAdminWidgetQuery(publicId: string) {
  return useSWR(
    isNonEmptyStringId(publicId) ? (["admin-widget", publicId] as const) : null,
    async ([, widgetId]) =>
      fetcher<FetcherResponse<AdminWidgetItem>>(
        `/admin/widgets/${encodeURIComponent(widgetId)}`,
      ),
  );
}
