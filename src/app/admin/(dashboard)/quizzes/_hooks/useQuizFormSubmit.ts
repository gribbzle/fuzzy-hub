"use client";

import { useCallback } from "react";

import { useRouter } from "next/navigation";

import { useAdminNotifications } from "../../_components/AdminNotifications";
import { useSubmitErrorWithToast } from "../../_components/useSubmitErrorWithToast";
import {
  type QuizFormValues,
  submitQuizFormRequest,
} from "../_utils/quizFormSubmit";

export function useQuizFormSubmit(options: {
  mode: "create" | "edit";
  quizId?: string;
  setSubmitError: (value: string | null) => void;
}) {
  const { mode, quizId, setSubmitError } = options;
  const router = useRouter();
  const { notifySuccess } = useAdminNotifications();
  const setSubmitErrorWithToast = useSubmitErrorWithToast(setSubmitError);

  return useCallback(
    async (values: QuizFormValues) => {
      const ok = await submitQuizFormRequest({
        mode,
        quizId,
        values,
        setSubmitError: setSubmitErrorWithToast,
      });
      if (!ok) {
        return;
      }
      notifySuccess(
        mode === "create"
          ? "Quiz created successfully."
          : "Quiz updated successfully.",
      );
      router.push("/admin/quizzes");
      router.refresh();
    },
    [mode, quizId, setSubmitErrorWithToast, router, notifySuccess],
  );
}
