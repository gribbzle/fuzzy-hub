"use client";

import { useCallback } from "react";

import { useRouter } from "next/navigation";

import type { UseFormClearErrors, UseFormSetError } from "react-hook-form";

import { useAdminNotifications } from "../../_components/AdminNotifications";
import { useSubmitErrorWithToast } from "../../_components/useSubmitErrorWithToast";
import type { BackgroundImageField } from "../_components/WidgetFormShared";
import {
  type WidgetFormSubmitMode,
  buildWidgetFormSubmission,
  submitWidgetRequest,
} from "../_utils/widgetFormSubmit";
import type { WidgetFormValues } from "../_utils/widgetFormTypes";

export function useWidgetFormSubmit({
  mode,
  widgetId,
  existingBackgroundImageIds,
  clearErrors,
  setError,
  setSubmitError,
}: {
  mode: WidgetFormSubmitMode;
  widgetId?: string;
  existingBackgroundImageIds?: Record<BackgroundImageField, string | null>;
  clearErrors: UseFormClearErrors<WidgetFormValues>;
  setError: UseFormSetError<WidgetFormValues>;
  setSubmitError: (value: string | null) => void;
}) {
  const router = useRouter();
  const { notifySuccess } = useAdminNotifications();
  const setSubmitErrorWithToast = useSubmitErrorWithToast(setSubmitError);

  return useCallback(
    async (values: WidgetFormValues) => {
      const { path, method, formData } = buildWidgetFormSubmission(values, {
        mode,
        widgetId,
        existingBackgroundImageIds,
      });
      const fallbackErrorMessage =
        mode === "create" ? "Failed to create widget" : "Failed to save widget";
      const ok = await submitWidgetRequest<WidgetFormValues>({
        path,
        method,
        formData,
        fallbackErrorMessage,
        clearErrors,
        setError,
        setSubmitError: setSubmitErrorWithToast,
      });
      if (!ok) {
        return;
      }
      notifySuccess(
        mode === "create"
          ? "Widget created successfully."
          : "Widget updated successfully.",
      );
      router.push("/admin");
      router.refresh();
    },
    [
      mode,
      widgetId,
      existingBackgroundImageIds,
      clearErrors,
      setError,
      setSubmitErrorWithToast,
      router,
      notifySuccess,
    ],
  );
}
