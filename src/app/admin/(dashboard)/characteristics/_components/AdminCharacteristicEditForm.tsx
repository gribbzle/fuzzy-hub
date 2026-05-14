"use client";

import { AdminEntityFormCard } from "../../_components/AdminEntityFormCard";
import { AdminEntityFormQueryState } from "../../_components/AdminEntityFormQueryState";
import { useAdminCharacteristicEditForm } from "../_hooks/useAdminCharacteristicEditForm";
import { CharacteristicCreateFormFields } from "./CharacteristicCreateFormFields";

interface AdminCharacteristicEditFormProps {
  characteristicId: string;
}

export function AdminCharacteristicEditForm({
  characteristicId,
}: AdminCharacteristicEditFormProps) {
  const {
    control,
    errors,
    isSubmitting,
    submitError,
    handleSubmit,
    onSubmit,
    loadError,
    isLoading,
    revalidateCharacteristic,
    canEdit,
  } = useAdminCharacteristicEditForm(characteristicId);

  return (
    <AdminEntityFormCard
      title="Edit characteristic"
      description="Update name, slug, type, group, and optional constraints."
      fullWidth
      submitError={submitError}
      submitIdleLabel="Save changes"
      submitPendingLabel="Saving…"
      isSubmitting={isSubmitting}
      submitDisabled={isLoading || !canEdit}
      onSubmit={handleSubmit(onSubmit)}
      backHref="/admin/characteristics"
      backLabel="Back to characteristics"
    >
      <AdminEntityFormQueryState
        loadError={loadError}
        loadErrorFallback="Failed to load characteristic."
        isLoading={isLoading}
        loadingMessage="Loading characteristic…"
        canRender={canEdit}
        onRetry={() => {
          void revalidateCharacteristic();
        }}
      >
        <CharacteristicCreateFormFields control={control} errors={errors} />
      </AdminEntityFormQueryState>
    </AdminEntityFormCard>
  );
}
