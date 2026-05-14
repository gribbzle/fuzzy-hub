"use client";

import { AdminQuizQuestionsListResponse } from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";
import { SWRResponse } from "swr";

import {
  buildAdminListQueryString,
  canAdminListFetch,
  isNonEmptyStringId,
} from "../_lib/adminListQueryString";

export function useAdminQuizQuestionsQuery(
  quizId: string,
  page: number,
  limit: number,
): SWRResponse<AdminQuizQuestionsListResponse, Error> {
  const canFetch = isNonEmptyStringId(quizId) && canAdminListFetch(page, limit);
  return useSWR<AdminQuizQuestionsListResponse, Error>(
    canFetch ? (["admin-quiz-questions", quizId, page, limit] as const) : null,
    async ([, publicId, p, l]: readonly [string, string, number, number]) => {
      const query = buildAdminListQueryString(p, l);
      return fetcher<AdminQuizQuestionsListResponse>(
        `/admin/quizzes/${encodeURIComponent(publicId)}/questions?${query}`,
      );
    },
  );
}
