"use client";

import { useCallback } from "react";

import { useRouter } from "next/navigation";

import { useSWRConfig } from "swr";

import { useAdminNotifications } from "../../_components/AdminNotifications";
import { useSubmitErrorWithToast } from "../../_components/useSubmitErrorWithToast";
import {
  type QuizProfileFormValues,
  submitQuizProfileFormRequest,
} from "../_utils/quizProfileFormSubmit";

export function useQuizProfileFormSubmit(options: {
  mode: "create" | "edit";
  quizProfileId?: string;
  setSubmitError: (value: string | null) => void;
}) {
  const { mode, quizProfileId, setSubmitError } = options;
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { notifySuccess } = useAdminNotifications();
  const setSubmitErrorWithToast = useSubmitErrorWithToast(setSubmitError);

  return useCallback(
    async (values: QuizProfileFormValues) => {
      const result = await submitQuizProfileFormRequest({
        mode,
        quizProfileId,
        values,
        setSubmitError: setSubmitErrorWithToast,
      });
      if (!result.ok) {
        return;
      }
      if (mode === "create" && result.createdPublicId) {
        notifySuccess("Quiz profile created successfully.");
        router.push(
          `/admin/quiz-profiles/${encodeURIComponent(result.createdPublicId)}/edit`,
        );
        router.refresh();
        return;
      }
      if (mode === "edit" && quizProfileId) {
        notifySuccess("Quiz profile updated successfully.");
        await mutate(["admin-quiz-profile", quizProfileId]);
        router.refresh();
        return;
      }
      notifySuccess("Quiz profile saved successfully.");
      router.push("/admin/quiz-profiles");
      router.refresh();
    },
    [
      mode,
      quizProfileId,
      setSubmitErrorWithToast,
      router,
      mutate,
      notifySuccess,
    ],
  );
}
