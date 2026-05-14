"use client";

import { useAdminResourceDelete } from "./useAdminResourceDelete";

export function useAdminDictionaryItemDelete(
  dictionaryId: string,
  mutate: () => Promise<unknown>,
) {
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
      `/admin/dictionaries/${encodeURIComponent(dictionaryId)}/dictionary-items/${encodeURIComponent(publicId)}`,
    fallbackErrorMessage: "Failed to delete dictionary item.",
    successMessage: "Dictionary item deleted successfully.",
  });

  return {
    deleteTargetItemId: deleteTargetId,
    isDeletingItem: isDeleting,
    deleteError,
    closeDeleteDialog,
    confirmDeleteItem: confirmDelete,
    requestDelete,
  };
}
