"use client";

import { useMemo, useState } from "react";

import { useAdminQuizProfileQuery } from "@/app/admin/(dashboard)/_hooks/useAdminQuizProfileQuery";
import { useForm } from "react-hook-form";

import type { QuizProfileFormValues } from "../_utils/quizProfileFormSubmit";
import { useQuizProfileFormSubmit } from "./useQuizProfileFormSubmit";

export type UseAdminQuizProfileFormOptions =
  | { mode: "create" }
  | { mode: "edit"; quizProfileId: string };

const defaultValues: QuizProfileFormValues = {
  name: "",
};

export function useAdminQuizProfileForm(
  options: UseAdminQuizProfileFormOptions,
) {
  const isEdit = options.mode === "edit";
  const quizProfileId = isEdit ? options.quizProfileId : "";

  const {
    data,
    error: loadError,
    isLoading,
  } = useAdminQuizProfileQuery(isEdit ? quizProfileId : "");
  const loaded = data?.data;
  const formValues = useMemo((): QuizProfileFormValues => {
    if (!isEdit || !loaded) {
      return defaultValues;
    }

    return {
      name: loaded.name,
    };
  }, [isEdit, loaded]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuizProfileFormValues>({
    defaultValues,
    values: formValues,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = useQuizProfileFormSubmit({
    mode: isEdit ? "edit" : "create",
    quizProfileId: isEdit ? quizProfileId : undefined,
    setSubmitError,
  });

  return {
    control,
    errors,
    isSubmitting,
    submitError,
    handleSubmit,
    onSubmit,
    loadError: isEdit ? loadError : undefined,
    isLoading: isEdit ? isLoading : false,
    profile: isEdit ? loaded : undefined,
  };
}
