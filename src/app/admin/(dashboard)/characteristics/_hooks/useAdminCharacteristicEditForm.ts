"use client";

import { useCallback, useMemo, useState } from "react";

import { useAdminCharacteristicQuery } from "@/app/admin/(dashboard)/_hooks/useAdminCharacteristicQuery";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

import { useAdminNotifications } from "../../_components/AdminNotifications";
import {
  applyCharacteristicFailedSubmit,
  submitCharacteristicPatchRequest,
} from "../_utils/characteristicFormSubmit";
import {
  CHARACTERISTIC_CREATE_GROUPS,
  CHARACTERISTIC_CREATE_TYPES,
  type CharacteristicFormValues,
} from "../_utils/characteristicFormTypes";

const emptyValues: CharacteristicFormValues = {
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

function normalizeLoadedType(value: string): CharacteristicFormValues["type"] {
  if (
    CHARACTERISTIC_CREATE_TYPES.includes(
      value as CharacteristicFormValues["type"],
    )
  ) {
    return value as CharacteristicFormValues["type"];
  }
  return "text";
}

function normalizeLoadedGroup(
  value: string,
): CharacteristicFormValues["group"] {
  if (
    CHARACTERISTIC_CREATE_GROUPS.includes(
      value as CharacteristicFormValues["group"],
    )
  ) {
    return value as CharacteristicFormValues["group"];
  }
  return "basic_information";
}

export function useAdminCharacteristicEditForm(characteristicId: string) {
  const { mutate } = useSWRConfig();
  const { notifySuccess, notifyError } = useAdminNotifications();
  const {
    data,
    error: loadError,
    isLoading,
    mutate: revalidateCharacteristic,
  } = useAdminCharacteristicQuery(characteristicId);
  const loaded = data?.data;

  const formValues = useMemo<CharacteristicFormValues>(() => {
    if (!loaded) {
      return emptyValues;
    }

    const dictionaryId = loaded.dictionary;
    const dictionaryValue =
      dictionaryId && typeof dictionaryId === "object"
        ? typeof dictionaryId.id === "number"
          ? String(dictionaryId.id)
          : typeof dictionaryId.id === "string" && dictionaryId.id.trim() !== ""
            ? dictionaryId.id.trim()
            : (loaded.dictionary?.public_id ?? "")
        : "";

    return {
      name: loaded.name,
      slug: loaded.slug,
      type: normalizeLoadedType(loaded.type),
      group: normalizeLoadedGroup(loaded.group),
      description: loaded.description?.trim() ? loaded.description : "",
      dictionary_id: dictionaryValue,
      unit: loaded.unit?.trim() ? loaded.unit : "",
      min: loaded.min != null ? String(loaded.min) : "",
      max: loaded.max != null ? String(loaded.max) : "",
      max_length: loaded.max_length != null ? String(loaded.max_length) : "",
    };
  }, [loaded]);

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CharacteristicFormValues>({
    defaultValues: emptyValues,
    values: formValues,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (values: CharacteristicFormValues) => {
      clearErrors();
      setSubmitError(null);

      const result = await submitCharacteristicPatchRequest({
        characteristicId,
        values,
      });
      if (!result.ok) {
        applyCharacteristicFailedSubmit(result, {
          setError,
          setSubmitError,
          notifyError,
          genericFieldErrorsMessage: "Failed to update characteristic.",
        });
        return;
      }

      await mutate(
        (key) => Array.isArray(key) && key[0] === "admin-characteristics",
        undefined,
        { revalidate: true },
      );
      await mutate(["admin-characteristic", characteristicId], undefined, {
        revalidate: true,
      });
      notifySuccess("Characteristic updated successfully.");
    },
    [
      characteristicId,
      clearErrors,
      mutate,
      notifyError,
      notifySuccess,
      setError,
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
    revalidateCharacteristic,
    canEdit: loaded != null,
  };
}
