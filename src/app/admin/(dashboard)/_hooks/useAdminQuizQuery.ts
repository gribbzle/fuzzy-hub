"use client";

import {
  AdminQuizItem,
  FetcherResponse,
} from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";

import { isNonEmptyStringId } from "../_lib/adminListQueryString";

export function useAdminQuizQuery(publicId: string) {
  return useSWR(
    isNonEmptyStringId(publicId) ? (["admin-quiz", publicId] as const) : null,
    async ([, quizId]) =>
      fetcher<FetcherResponse<AdminQuizItem>>(
        `/admin/quizzes/${encodeURIComponent(quizId)}`,
      ),
  );
}
