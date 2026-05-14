"use client";

import { AdminQuizProfilePropertyWeightsResponse } from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";

import { isNonEmptyStringId } from "../_lib/adminListQueryString";

export function useAdminQuizProfilePropertyWeightsQuery(
  quizProfilePublicId: string,
) {
  return useSWR(
    isNonEmptyStringId(quizProfilePublicId)
      ? (["admin-quiz-profile-property-weights", quizProfilePublicId] as const)
      : null,
    async ([, id]) =>
      fetcher<AdminQuizProfilePropertyWeightsResponse>(
        `/admin/quiz-profiles/${encodeURIComponent(id)}/property-weights`,
      ),
  );
}
