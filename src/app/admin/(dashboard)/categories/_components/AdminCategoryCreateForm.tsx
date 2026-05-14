"use client";

import { AdminEntityFormCard } from "../../_components/AdminEntityFormCard";
import { useAdminCategoryCreateForm } from "../_hooks/useAdminCategoryCreateForm";
import { CategoryCreateFormFields } from "./CategoryCreateFormFields";

export function AdminCategoryCreateForm() {
  const { control, errors, isSubmitting, submitError, handleSubmit, onSubmit } =
    useAdminCategoryCreateForm();

  return (
    <AdminEntityFormCard
      title="Add category"
      description="Set catalog, name, slug, image, and description for the new category."
      fullWidth
      submitError={submitError}
      submitIdleLabel="Create category"
      submitPendingLabel="Creating…"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      backHref="/admin/categories"
      backLabel="Back to categories"
    >
      <CategoryCreateFormFields control={control} errors={errors} />
    </AdminEntityFormCard>
  );
}
