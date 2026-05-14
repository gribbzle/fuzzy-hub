"use client";

import { useMemo, useState } from "react";

import { AdminDictionaryItem } from "@/app/admin/(dashboard)/_models";
import { Controller, useForm } from "react-hook-form";

import { AdminModal } from "../../_components/AdminModal";
import { useAdminNotifications } from "../../_components/AdminNotifications";
import { Button } from "../../_components/ui/button";
import { FormField } from "../../_components/ui/form-field";
import { Input } from "../../_components/ui/input";
import { useSubmitErrorWithToast } from "../../_components/useSubmitErrorWithToast";
import {
  type DictionaryItemFormValues,
  submitDictionaryItemCreateRequest,
  submitDictionaryItemPatchRequest,
} from "../_utils/dictionaryItemFormSubmit";

const emptyValues: DictionaryItemFormValues = {
  value: "",
  label: "",
  order: 1,
};

interface DictionaryItemFormModalProps {
  open: boolean;
  onClose: () => void;
  dictionaryId: string;
  mode: "create" | "edit";
  item: AdminDictionaryItem | null;
  onSaveSuccess: () => void | Promise<void>;
}

export function DictionaryItemFormModal({
  open,
  onClose,
  dictionaryId,
  mode,
  item,
  onSaveSuccess,
}: DictionaryItemFormModalProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { notifySuccess } = useAdminNotifications();
  const setSubmitErrorWithToast = useSubmitErrorWithToast(setSubmitError);

  const formValues = useMemo(() => {
    if (!open) {
      return emptyValues;
    }
    if (mode === "edit" && item) {
      return {
        value: item.value,
        label: item.label,
        order: item.order,
      } satisfies DictionaryItemFormValues;
    }
    return emptyValues;
  }, [open, mode, item]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DictionaryItemFormValues>({
    defaultValues: emptyValues,
    values: formValues,
  });

  const isCreate = mode === "create";
  const titleId = isCreate
    ? "dictionary-item-create-title"
    : "dictionary-item-edit-title";

  const onSubmit = async (values: DictionaryItemFormValues) => {
    if (mode === "create") {
      const ok = await submitDictionaryItemCreateRequest({
        dictionaryId,
        values,
        setSubmitError: setSubmitErrorWithToast,
      });
      if (!ok) {
        return;
      }
      notifySuccess("Dictionary item created successfully.");
    } else {
      if (!item) {
        return;
      }
      const ok = await submitDictionaryItemPatchRequest({
        dictionaryId,
        itemId: item.public_id,
        values,
        setSubmitError: setSubmitErrorWithToast,
      });
      if (!ok) {
        return;
      }
      notifySuccess("Dictionary item updated successfully.");
    }

    setSubmitError(null);
    await onSaveSuccess();
    onClose();
  };

  return (
    <AdminModal
      open={open}
      onClose={() => {
        if (!isSubmitting) {
          setSubmitError(null);
          onClose();
        }
      }}
      backdropDismissDisabled={isSubmitting}
      titleId={titleId}
      title={isCreate ? "Add dictionary item" : "Edit dictionary item"}
      description={
        isCreate
          ? "Set value, label, and display order."
          : "Update value, label, and display order."
      }
    >
      <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {submitError ? (
          <p className="text-sm text-red-600" role="alert">
            {submitError}
          </p>
        ) : null}

        <FormField
          id="dictionary-item-value"
          label="Value"
          errorMessage={errors.value?.message}
          labelClassName="text-zinc-900"
          helperText="Stable key (e.g. golden-retriever)."
        >
          <Controller
            name="value"
            control={control}
            rules={{ required: "Value is required" }}
            render={({ field }) => (
              <Input
                id="dictionary-item-value"
                type="text"
                autoComplete="off"
                className="font-mono"
                placeholder="golden-retriever"
                {...field}
              />
            )}
          />
        </FormField>

        <FormField
          id="dictionary-item-label"
          label="Label"
          errorMessage={errors.label?.message}
          labelClassName="text-zinc-900"
        >
          <Controller
            name="label"
            control={control}
            rules={{ required: "Label is required" }}
            render={({ field }) => (
              <Input
                id="dictionary-item-label"
                type="text"
                autoComplete="off"
                placeholder="Golden Retriever"
                {...field}
              />
            )}
          />
        </FormField>

        <FormField
          id="dictionary-item-order"
          label="Order"
          errorMessage={errors.order?.message}
          labelClassName="text-zinc-900"
        >
          <Controller
            name="order"
            control={control}
            rules={{
              required: "Order is required",
              validate: (v) =>
                typeof v === "number" &&
                Number.isFinite(v) &&
                Number.isInteger(v) &&
                v >= 1
                  ? true
                  : "Enter a whole number ≥ 1",
            }}
            render={({ field }) => (
              <Input
                id="dictionary-item-order"
                type="number"
                min={1}
                step={1}
                inputSize="compact"
                value={field.value}
                onChange={(e) => {
                  const n = parseInt(e.target.value, 10);
                  field.onChange(Number.isFinite(n) ? n : 1);
                }}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
            )}
          />
        </FormField>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={() => {
              setSubmitError(null);
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : isCreate ? "Create item" : "Save item"}
          </Button>
        </div>
      </form>
    </AdminModal>
  );
}
