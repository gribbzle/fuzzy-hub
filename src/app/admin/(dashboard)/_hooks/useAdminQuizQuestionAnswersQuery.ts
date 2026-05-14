"use client";

import { AdminQuizQuestionAnswersListResponse } from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";

import { isNonEmptyStringId } from "../_lib/adminListQueryString";

export function useAdminQuizQuestionAnswersQuery(
  quizId: string,
  questionId: string | null,
) {
  const canFetch = isNonEmptyStringId(quizId) && isNonEmptyStringId(questionId);
  return useSWR(
    canFetch
      ? (["admin-quiz-question-answers", quizId, questionId] as const)
      : null,
    async ([, publicQuizId, publicQuestionId]) =>
      fetcher<AdminQuizQuestionAnswersListResponse>(
        `/admin/quizzes/${encodeURIComponent(publicQuizId)}/questions/${encodeURIComponent(publicQuestionId)}/answers`,
      ),
  );
}
