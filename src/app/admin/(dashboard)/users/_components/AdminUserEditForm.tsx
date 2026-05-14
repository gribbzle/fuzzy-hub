"use client";

import { AdminEntityFormCard } from "../../_components/AdminEntityFormCard";
import { FormErrorAlert } from "../../_components/FormErrorAlert";
import { Button } from "../../_components/ui/button";
import { useAdminUserMetadataForm } from "../_hooks/useAdminUserMetadataForm";
import { AdminUserEditFormFields } from "./AdminUserEditFormFields";

interface AdminUserEditFormProps {
  userId: string;
}

export function AdminUserEditForm({ userId }: AdminUserEditFormProps) {
  const {
    control,
    errors,
    isSubmitting,
    submitError,
    handleSubmit,
    onSubmit,
    loadError,
    isLoading,
    revalidateUser,
    canEdit,
  } = useAdminUserMetadataForm(userId);

  return (
    <AdminEntityFormCard
      title="Edit user"
      description="Update account email and optionally set a new password."
      fullWidth
      submitError={submitError}
      submitIdleLabel="Save changes"
      submitPendingLabel="Saving…"
      isSubmitting={isSubmitting}
      submitDisabled={isLoading || !canEdit}
      onSubmit={handleSubmit(onSubmit)}
      backHref="/admin/users"
      backLabel="Back to users"
    >
      {loadError && !canEdit && !isLoading ? (
        <div className="space-y-3">
          <FormErrorAlert>
            {loadError instanceof Error
              ? loadError.message
              : "Failed to load user."}
          </FormErrorAlert>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              void revalidateUser();
            }}
          >
            Try again
          </Button>
        </div>
      ) : null}
      {isLoading ? (
        <p className="text-sm text-zinc-500">Loading user…</p>
      ) : canEdit ? (
        <AdminUserEditFormFields control={control} errors={errors} />
      ) : null}
    </AdminEntityFormCard>
  );
}
