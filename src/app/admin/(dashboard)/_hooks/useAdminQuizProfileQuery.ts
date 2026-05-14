"use client";

import { AdminQuizProfileResponse } from "@/app/admin/(dashboard)/_models";
import { fetcher } from "@utils";
import useSWR from "swr";

import { isNonEmptyStringId } from "../_lib/adminListQueryString";

export function useAdminQuizProfileQuery(publicId: string) {
  return useSWR(
    isNonEmptyStringId(publicId)
      ? (["admin-quiz-profile", publicId] as const)
      : null,
    async ([, quizProfileId]) =>
      fetcher<AdminQuizProfileResponse>(
        `/admin/quiz-profiles/${encodeURIComponent(quizProfileId)}`,
      ),
  );
}
