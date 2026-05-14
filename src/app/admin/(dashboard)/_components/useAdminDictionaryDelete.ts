"use client";

import { useAdminResourceDelete } from "./useAdminResourceDelete";

export function useAdminDictionaryDelete(mutate: () => Promise<unknown>) {
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
      `/admin/dictionaries/${encodeURIComponent(publicId)}`,
    fallbackErrorMessage: "Failed to delete dictionary.",
    successMessage: "Dictionary deleted successfully.",
  });

  return {
    deleteTargetDictionaryId: deleteTargetId,
    isDeletingDictionary: isDeleting,
    deleteError,
    closeDeleteDialog,
    confirmDeleteDictionary: confirmDelete,
    requestDelete,
  };
}
