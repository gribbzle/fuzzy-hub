"use client";

import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

import { useAdminNotifications } from "../../_components/AdminNotifications";
import {
  applyCharacteristicFailedSubmit,
  submitCharacteristicCreateRequest,
} from "../_utils/characteristicFormSubmit";
import type { CharacteristicFormValues } from "../_utils/characteristicFormTypes";

const defaultValues: CharacteristicFormValues = {
  name: "",
  slug: "",
  type: "text",
  group: "basic_information",
  description: "",
  dictionary_id: "",
  unit: "",
  min: "",
  max: "",
  max_length: "",
};

export function useAdminCharacteristicCreateForm() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { notifySuccess, notifyError } = useAdminNotifications();

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<CharacteristicFormValues>({
    defaultValues,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (values: CharacteristicFormValues) => {
      clearErrors();
      setSubmitError(null);

      const result = await submitCharacteristicCreateRequest({ values });
      if (!result.ok) {
        applyCharacteristicFailedSubmit(result, {
          setError,
          setSubmitError,
          notifyError,
          genericFieldErrorsMessage: "Failed to create characteristic.",
        });
        return;
      }

      await mutate(
        (key) => Array.isArray(key) && key[0] === "admin-characteristics",
        undefined,
        { revalidate: true },
      );

      notifySuccess("Characteristic created successfully.");
      router.push("/admin/characteristics");
      router.refresh();
    },
    [clearErrors, mutate, notifyError, notifySuccess, router, setError],
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
