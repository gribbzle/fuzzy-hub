"use client";

import { useCallback, useMemo, useState } from "react";

import { useAdminUserQuery } from "@/app/admin/(dashboard)/_hooks/useAdminUserQuery";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

import { useAdminNotifications } from "../../_components/AdminNotifications";
import { useSubmitErrorWithToast } from "../../_components/useSubmitErrorWithToast";
import type { AdminUserFormValues } from "../_utils/userFormSubmit";
import { submitAdminUserPatchRequest } from "../_utils/userFormSubmit";

const emptyValues: AdminUserFormValues = {
  email: "",
  password: "",
};

export function useAdminUserMetadataForm(userId: string) {
  const { mutate } = useSWRConfig();
  const { notifySuccess } = useAdminNotifications();

  const {
    data,
    error: loadError,
    isLoading,
    mutate: revalidateUser,
  } = useAdminUserQuery(userId);
  const loaded = data?.data;

  const formValues = useMemo(() => {
    if (!loaded) {
      return emptyValues;
    }

    return {
      email: loaded.email,
      password: "",
    } satisfies AdminUserFormValues;
  }, [loaded]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AdminUserFormValues>({
    defaultValues: emptyValues,
    values: formValues,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const setSubmitErrorWithToast = useSubmitErrorWithToast(setSubmitError);

  const onSubmit = useCallback(
    async (values: AdminUserFormValues) => {
      const ok = await submitAdminUserPatchRequest({
        userId,
        values,
        setSubmitError: setSubmitErrorWithToast,
      });
      if (!ok) {
        return;
      }

      reset({
        email: values.email.trim(),
        password: "",
      });

      await mutate(
        (key) => Array.isArray(key) && key[0] === "admin-users",
        undefined,
        { revalidate: true },
      );
      await mutate(["admin-user", userId], undefined, { revalidate: true });
      await mutate(
        (key) =>
          Array.isArray(key) &&
          key[0] === "admin-user-profiles" &&
          key[1] === userId,
        undefined,
        { revalidate: true },
      );
      notifySuccess("User updated successfully.");
    },
    [mutate, notifySuccess, reset, setSubmitErrorWithToast, userId],
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
    revalidateUser,
    canEdit: loaded != null,
    user: loaded,
  };
}
