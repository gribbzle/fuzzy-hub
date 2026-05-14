"use client";

import { useCallback, useMemo, useState } from "react";

import { useAdminDictionaryQuery } from "@/app/admin/(dashboard)/_hooks/useAdminDictionaryQuery";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

import { useAdminNotifications } from "../../_components/AdminNotifications";
import { useSubmitErrorWithToast } from "../../_components/useSubmitErrorWithToast";
import type { DictionaryFormValues } from "../_utils/dictionaryFormSubmit";
import { submitDictionaryPatchRequest } from "../_utils/dictionaryFormSubmit";

const emptyValues: DictionaryFormValues = {
  name: "",
  slug: "",
  description: "",
};

export function useAdminDictionaryMetadataForm(dictionaryId: string) {
  const { mutate } = useSWRConfig();
  const { notifySuccess } = useAdminNotifications();

  const {
    data,
    error: loadError,
    isLoading,
    mutate: revalidateDictionary,
  } = useAdminDictionaryQuery(dictionaryId);
  const loaded = data?.data;

  const formValues = useMemo(() => {
    if (!loaded) {
      return emptyValues;
    }

    return {
      name: loaded.name,
      slug: loaded.slug,
      description: loaded.description?.trim() ? loaded.description : "",
    } satisfies DictionaryFormValues;
  }, [loaded]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DictionaryFormValues>({
    defaultValues: emptyValues,
    values: formValues,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const setSubmitErrorWithToast = useSubmitErrorWithToast(setSubmitError);

  const onSubmit = useCallback(
    async (values: DictionaryFormValues) => {
      const ok = await submitDictionaryPatchRequest({
        dictionaryId,
        values,
        setSubmitError: setSubmitErrorWithToast,
      });
      if (!ok) {
        return;
      }

      await mutate(
        (key) => Array.isArray(key) && key[0] === "admin-dictionaries",
        undefined,
        { revalidate: true },
      );
      await mutate(["admin-dictionary", dictionaryId], undefined, {
        revalidate: true,
      });
      notifySuccess("Dictionary updated successfully.");
    },
    [dictionaryId, mutate, notifySuccess, setSubmitErrorWithToast],
  );

  return {
    control,
    errors,
    isSubmitting,
    submitError,
    handleSubmit,
    onSubmit,
    loadError,
    isLoading: isLoading && loaded == null,
    revalidateDictionary,
    canEdit: loaded != null,
  };
}
