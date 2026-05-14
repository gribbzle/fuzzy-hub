"use client";

import { useMemo, useState } from "react";

import { useAdminQuizQuery } from "@/app/admin/(dashboard)/_hooks/useAdminQuizQuery";
import { useForm } from "react-hook-form";

import type { QuizFormValues } from "../_utils/quizFormSubmit";
import { useQuizFormSubmit } from "./useQuizFormSubmit";

export type UseAdminQuizFormOptions =
  | { mode: "create" }
  | { mode: "edit"; quizId: string };

const defaultValues: QuizFormValues = {
  name: "",
  status: "active",
};

export function useAdminQuizForm(options: UseAdminQuizFormOptions) {
  const isEdit = options.mode === "edit";
  const quizId = isEdit ? options.quizId : "";

  const { data, error: loadError, isLoading } = useAdminQuizQuery(quizId);
  const loaded = data?.data;
  const formValues = useMemo(() => {
    if (!isEdit || !loaded) {
      return defaultValues;
    }

    return {
      name: loaded.name,
      status: loaded.status,
    } satisfies QuizFormValues;
  }, [isEdit, loaded]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuizFormValues>({
    defaultValues,
    values: formValues,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = useQuizFormSubmit({
    mode: isEdit ? "edit" : "create",
    quizId: isEdit ? quizId : undefined,
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
  };
}
