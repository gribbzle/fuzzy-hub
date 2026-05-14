"use client";

import { AdminEntityFormCard } from "../../_components/AdminEntityFormCard";
import { useAdminCharacteristicCreateForm } from "../_hooks/useAdminCharacteristicCreateForm";
import { CharacteristicCreateFormFields } from "./CharacteristicCreateFormFields";

export function AdminCharacteristicCreateForm() {
  const { control, errors, isSubmitting, submitError, handleSubmit, onSubmit } =
    useAdminCharacteristicCreateForm();

  return (
    <AdminEntityFormCard
      title="Add characteristic"
      description="Define a name, slug, type, and group. Other fields are optional."
      fullWidth
      submitError={submitError}
      submitIdleLabel="Create characteristic"
      submitPendingLabel="Creating…"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      backHref="/admin/characteristics"
      backLabel="Back to characteristics"
    >
      <CharacteristicCreateFormFields control={control} errors={errors} />
    </AdminEntityFormCard>
  );
}
