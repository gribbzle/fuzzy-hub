"use client";

import { useAdminResourceDelete } from "./useAdminResourceDelete";

export function useAdminCharacteristicDelete(mutate: () => Promise<unknown>) {
  const {
    deleteTargetId,
    isDeleting,
    deleteError,
    closeDeleteDialog,
    confirmDelete,
    requestDelete,
  } = useAdminResourceDelete({
    mutate,
    getDeletePath: (publicId) =>
      `/admin/characteristics/${encodeURIComponent(publicId)}`,
    fallbackErrorMessage: "Failed to delete characteristic.",
    successMessage: "Characteristic deleted successfully.",
  });

  return {
    deleteTargetCharacteristicId: deleteTargetId,
    isDeletingCharacteristic: isDeleting,
    deleteError,
    closeDeleteDialog,
    confirmDeleteCharacteristic: confirmDelete,
    requestDelete,
  };
}
