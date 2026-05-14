"use client";

import { AdminEntityFormCard } from "../../_components/AdminEntityFormCard";
import { useAdminDictionaryCreateForm } from "../_hooks/useAdminDictionaryCreateForm";
import { DictionaryMetadataFormFields } from "./DictionaryMetadataFormFields";

export function AdminDictionaryCreateForm() {
  const { control, errors, isSubmitting, submitError, handleSubmit, onSubmit } =
    useAdminDictionaryCreateForm();

  return (
    <AdminEntityFormCard
      title="Add dictionary"
      description="Set a name, slug, and description for the new dictionary."
      fullWidth
      submitError={submitError}
      submitIdleLabel="Create dictionary"
      submitPendingLabel="Creating…"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      backHref="/admin/dictionaries"
      backLabel="Back to dictionaries"
    >
      <DictionaryMetadataFormFields control={control} errors={errors} />
    </AdminEntityFormCard>
  );
}
