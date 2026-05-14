"use client";

import { useCallback, useMemo, useState } from "react";

import { useAdminCategoryQuery } from "@/app/admin/(dashboard)/_hooks/useAdminCategoryQuery";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

// TODO: убрать зависимость от market
import { getAttachmentUrl } from "@portal/market/utils";

import { useAdminNotifications } from "../../_components/AdminNotifications";
import {
  CategoryMetadataFormValues,
  applyCategoryPatchFailedSubmit,
  submitCategoryPatchRequest,
} from "../_utils/categoryFormSubmit";

const emptyValues: CategoryMetadataFormValues = {
  name: "",
  slug: "",
  image: null,
  description: "",
};

export function useAdminCategoryMetadataForm(categoryId: string) {
  const { mutate } = useSWRConfig();
  const { notifySuccess, notifyError } = useAdminNotifications();

  const {
    data,
    error: loadError,
    isLoading,
    mutate: revalidateCategory,
  } = useAdminCategoryQuery(categoryId);
  const loaded = data?.data;

  const formValues = useMemo(() => {
    if (!loaded) {
      return emptyValues;
    }

    return {
      name: loaded.name,
      slug: loaded.slug,
      image: null,
      description: loaded.description?.trim() ? loaded.description : "",
    } satisfies CategoryMetadataFormValues;
  }, [loaded]);

  const currentImageUrl = useMemo(() => {
    const imageId = loaded?.image_id?.trim();
    return imageId ? getAttachmentUrl(imageId) : null;
  }, [loaded?.image_id]);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<CategoryMetadataFormValues>({
    defaultValues: emptyValues,
    values: formValues,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (values: CategoryMetadataFormValues) => {
      clearErrors();
      setSubmitError(null);

      const result = await submitCategoryPatchRequest({
        categoryId,
        values,
      });
      if (!result.ok) {
        applyCategoryPatchFailedSubmit(result, {
          setError,
          setSubmitError,
          notifyError,
          genericFieldErrorsMessage: "Failed to update category.",
        });
        return;
      }

      await mutate(
        (key) => Array.isArray(key) && key[0] === "admin-categories",
        undefined,
        { revalidate: true },
      );
      await mutate(["admin-category", categoryId], undefined, {
        revalidate: true,
      });
      notifySuccess("Category updated successfully.");
    },
    [categoryId, clearErrors, mutate, notifyError, notifySuccess, setError],
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
    revalidateCategory,
    canEdit: loaded != null,
    currentImageUrl,
  };
}
