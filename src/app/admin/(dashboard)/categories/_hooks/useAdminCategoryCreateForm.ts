"use client";

import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

import { useAdminNotifications } from "../../_components/AdminNotifications";
import {
  CategoryFormValues,
  applyCategoryCreateFailedSubmit,
  submitCategoryCreateRequest,
} from "../_utils/categoryFormSubmit";

const defaultValues: CategoryFormValues = {
  catalog_id: "",
  name: "",
  slug: "",
  image: null,
  description: "",
};

export function useAdminCategoryCreateForm() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { notifySuccess, notifyError } = useAdminNotifications();

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    defaultValues,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (values: CategoryFormValues) => {
      clearErrors();
      setSubmitError(null);

      const result = await submitCategoryCreateRequest({ values });
      if (!result.ok) {
        applyCategoryCreateFailedSubmit(result, {
          setError,
          setSubmitError,
          notifyError,
          genericFieldErrorsMessage: "Failed to create category.",
        });
        return;
      }

      await mutate(
        (key) => Array.isArray(key) && key[0] === "admin-categories",
        undefined,
        { revalidate: true },
      );

      notifySuccess("Category created successfully.");
      router.push("/admin/categories");
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
