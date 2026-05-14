"use client";

import { useCallback, useMemo, useState } from "react";

import { useAdminUserProfileQuery } from "@/app/admin/(dashboard)/_hooks/useAdminUserProfileQuery";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

import { useAdminNotifications } from "../../_components/AdminNotifications";
import { useSubmitErrorWithToast } from "../../_components/useSubmitErrorWithToast";
import type { AdminUserProfileFormValues } from "../_utils/userProfileFormSubmit";
import { submitAdminUserProfilePatchRequest } from "../_utils/userProfileFormSubmit";

function pickProfileString(
  profileData: Record<string, unknown>,
  keys: string[],
): string {
  for (const key of keys) {
    const v = profileData[key];
    if (typeof v === "string") {
      return v;
    }
  }
  return "";
}

const emptyValues: AdminUserProfileFormValues = {
  approved: false,
  full_name: "",
  phone_number: "",
};

export function useAdminUserProfileForm(options: {
  userId: string;
  profileId: string;
  /** Called after a successful PATCH (after cache revalidation and success toast). */
  onSaved?: () => void | Promise<void>;
}) {
  const { userId, profileId, onSaved } = options;
  const { mutate } = useSWRConfig();
  const { notifySuccess } = useAdminNotifications();

  const {
    data,
    error: loadError,
    isLoading,
    mutate: revalidateProfile,
  } = useAdminUserProfileQuery(userId, profileId);
  const loaded = data?.data;

  const formValues = useMemo(() => {
    if (!loaded) {
      return emptyValues;
    }

    const pd = loaded.profile_data ?? {};

    return {
      approved: loaded.approved,
      full_name: pickProfileString(pd, ["full_name", "name"]),
      phone_number: pickProfileString(pd, ["phone_number", "phone", "mobile"]),
    } satisfies AdminUserProfileFormValues;
  }, [loaded]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminUserProfileFormValues>({
    defaultValues: emptyValues,
    values: formValues,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const setSubmitErrorWithToast = useSubmitErrorWithToast(setSubmitError);

  const onSubmit = useCallback(
    async (values: AdminUserProfileFormValues) => {
      const ok = await submitAdminUserProfilePatchRequest({
        userId,
        profileId,
        values,
        setSubmitError: setSubmitErrorWithToast,
      });
      if (!ok) {
        return;
      }

      await mutate(
        (key) =>
          Array.isArray(key) &&
          key[0] === "admin-user-profiles" &&
          key[1] === userId,
        undefined,
        { revalidate: true },
      );
      await mutate(["admin-user-profile", userId, profileId], undefined, {
        revalidate: true,
      });
      notifySuccess("Profile updated successfully.");
      await onSaved?.();
    },
    [
      mutate,
      notifySuccess,
      onSaved,
      profileId,
      setSubmitErrorWithToast,
      userId,
    ],
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
    revalidateProfile,
    canEdit: loaded != null,
    profile: loaded,
  };
}
