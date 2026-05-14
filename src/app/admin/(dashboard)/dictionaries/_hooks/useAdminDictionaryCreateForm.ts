"use client";

import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

import { useAdminNotifications } from "../../_components/AdminNotifications";
import { useSubmitErrorWithToast } from "../../_components/useSubmitErrorWithToast";
import type { DictionaryFormValues } from "../_utils/dictionaryFormSubmit";
import { submitDictionaryCreateRequest } from "../_utils/dictionaryFormSubmit";

const defaultValues: DictionaryFormValues = {
  name: "",
  slug: "",
  description: "",
};

export function useAdminDictionaryCreateForm() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { notifySuccess } = useAdminNotifications();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DictionaryFormValues>({
    defaultValues,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const setSubmitErrorWithToast = useSubmitErrorWithToast(setSubmitError);

  const onSubmit = useCallback(
    async (values: DictionaryFormValues) => {
      const result = await submitDictionaryCreateRequest({
        values,
        setSubmitError: setSubmitErrorWithToast,
      });
      if (!result.ok) {
        return;
      }

      await mutate(
        (key) => Array.isArray(key) && key[0] === "admin-dictionaries",
        undefined,
        { revalidate: true },
      );

      notifySuccess("Dictionary created successfully.");
      router.push(
        `/admin/dictionaries/${encodeURIComponent(result.createdPublicId)}/edit`,
      );
      router.refresh();
    },
    [mutate, router, notifySuccess, setSubmitErrorWithToast],
  );

  return {
    control,
    errors,
    isSubmitting,
    submitError,
    handleSubmit,
    onSubmit,
  };
}
