"use client";

import { AdminEntityFormCard } from "../../_components/AdminEntityFormCard";
import { AdminEntityFormQueryState } from "../../_components/AdminEntityFormQueryState";
import { useAdminCategoryMetadataForm } from "../_hooks/useAdminCategoryMetadataForm";
import { CategoryCharacteristicsEditor } from "./CategoryCharacteristicsEditor";
import { CategoryMetadataFormFields } from "./CategoryMetadataFormFields";

interface AdminCategoryEditFormProps {
  categoryId: string;
}

export function AdminCategoryEditForm({
  categoryId,
}: AdminCategoryEditFormProps) {
  const {
    control,
    errors,
    isSubmitting,
    submitError,
    handleSubmit,
    onSubmit,
    loadError,
    isLoading,
    revalidateCategory,
    canEdit,
    currentImageUrl,
  } = useAdminCategoryMetadataForm(categoryId);

  return (
    <>
      <AdminEntityFormCard
        title="Edit category"
        description="Update name, slug, image, and description."
        fullWidth
        submitError={submitError}
        submitIdleLabel="Save changes"
        submitPendingLabel="Saving…"
        isSubmitting={isSubmitting}
        submitDisabled={isLoading || !canEdit}
        onSubmit={handleSubmit(onSubmit)}
        backHref="/admin/categories"
        backLabel="Back to categories"
      >
        <AdminEntityFormQueryState
          loadError={loadError}
          loadErrorFallback="Failed to load category."
          isLoading={isLoading}
          loadingMessage="Loading category…"
          canRender={canEdit}
          onRetry={() => {
            void revalidateCategory();
          }}
        >
          <CategoryMetadataFormFields
            control={control}
            errors={errors}
            currentImageUrl={currentImageUrl}
          />
        </AdminEntityFormQueryState>
      </AdminEntityFormCard>

      {canEdit ? (
        <CategoryCharacteristicsEditor categoryId={categoryId} />
      ) : null}
    </>
  );
}
