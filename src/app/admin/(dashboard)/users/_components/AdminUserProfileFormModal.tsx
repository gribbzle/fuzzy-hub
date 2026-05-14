"use client";

import { AdminEntityFormQueryState } from "../../_components/AdminEntityFormQueryState";
import { AdminModal } from "../../_components/AdminModal";
import { Button } from "../../_components/ui/button";
import { useAdminUserProfileForm } from "../_hooks/useAdminUserProfileForm";
import { AdminUserProfileEditFormFields } from "./AdminUserProfileEditFormFields";

interface AdminUserProfileFormModalProps {
  open: boolean;
  onClose: () => void;
  userPublicId: string;
  profilePublicId: string;
  onSaveSuccess?: () => void | Promise<void>;
}

export function AdminUserProfileFormModal({
  open,
  onClose,
  userPublicId,
  profilePublicId,
  onSaveSuccess,
}: AdminUserProfileFormModalProps) {
  const {
    control,
    errors,
    isSubmitting,
    submitError,
    handleSubmit,
    onSubmit,
    loadError,
    isLoading,
    revalidateProfile,
    canEdit,
    profile,
  } = useAdminUserProfileForm({
    userId: userPublicId,
    profileId: profilePublicId,
    onSaved: async () => {
      await onSaveSuccess?.();
      onClose();
    },
  });

  const titleId = "admin-user-profile-edit-title";

  return (
    <AdminModal
      open={open}
      onClose={() => {
        if (!isSubmitting) {
          onClose();
        }
      }}
      backdropDismissDisabled={isSubmitting}
      titleId={titleId}
      title="Edit profile"
      description="Update approval and contact fields for this profile."
      panelClassName="max-w-2xl"
    >
      <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {submitError ? (
          <p className="text-sm text-red-600" role="alert">
            {submitError}
          </p>
        ) : null}

        <div className="space-y-4">
          <AdminEntityFormQueryState
            loadError={loadError}
            loadErrorFallback="Failed to load profile."
            isLoading={isLoading}
            loadingMessage="Loading profile…"
            canRender
            showNonBlockingError
            showLoadingWhileRenderable={!profile}
            onRetry={() => {
              void revalidateProfile();
            }}
          >
            {canEdit ? (
              <AdminUserProfileEditFormFields
                control={control}
                errors={errors}
              />
            ) : null}
          </AdminEntityFormQueryState>
        </div>

        <div className="mt-4 flex shrink-0 justify-end gap-2 border-t border-zinc-100 pt-4">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || isLoading || !canEdit}
          >
            {isSubmitting ? "Saving…" : "Save profile"}
          </Button>
        </div>
      </form>
    </AdminModal>
  );
}
