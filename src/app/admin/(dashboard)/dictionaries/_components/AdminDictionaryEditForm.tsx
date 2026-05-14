"use client";

import { AdminEntityFormCard } from "../../_components/AdminEntityFormCard";
import { FormErrorAlert } from "../../_components/FormErrorAlert";
import { Button } from "../../_components/ui/button";
import { useAdminDictionaryMetadataForm } from "../_hooks/useAdminDictionaryMetadataForm";
import { DictionaryMetadataFormFields } from "./DictionaryMetadataFormFields";

interface AdminDictionaryEditFormProps {
  dictionaryId: string;
}

export function AdminDictionaryEditForm({
  dictionaryId,
}: AdminDictionaryEditFormProps) {
  const {
    control,
    errors,
    isSubmitting,
    submitError,
    handleSubmit,
    onSubmit,
    loadError,
    isLoading,
    revalidateDictionary,
    canEdit,
  } = useAdminDictionaryMetadataForm(dictionaryId);

  return (
    <AdminEntityFormCard
      title="Edit dictionary"
      description="Update name, slug, and description."
      fullWidth
      submitError={submitError}
      submitIdleLabel="Save changes"
      submitPendingLabel="Saving…"
      isSubmitting={isSubmitting}
      submitDisabled={isLoading || !canEdit}
      onSubmit={handleSubmit(onSubmit)}
      backHref="/admin/dictionaries"
      backLabel="Back to dictionaries"
    >
      {loadError && !canEdit && !isLoading ? (
        <div className="space-y-3">
          <FormErrorAlert>
            {loadError instanceof Error
              ? loadError.message
              : "Failed to load dictionary."}
          </FormErrorAlert>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              void revalidateDictionary();
            }}
          >
            Try again
          </Button>
        </div>
      ) : null}
      {isLoading ? (
        <p className="text-sm text-zinc-500">Loading dictionary…</p>
      ) : canEdit ? (
        <DictionaryMetadataFormFields control={control} errors={errors} />
      ) : null}
    </AdminEntityFormCard>
  );
}
