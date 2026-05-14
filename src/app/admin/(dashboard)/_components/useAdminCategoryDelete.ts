"use client";

import { useAdminResourceDelete } from "./useAdminResourceDelete";

export function useAdminCategoryDelete(mutate: () => Promise<unknown>) {
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
      `/admin/categories/${encodeURIComponent(publicId)}`,
    fallbackErrorMessage: "Failed to delete category.",
    successMessage: "Category deleted successfully.",
  });

  return {
    deleteTargetCategoryId: deleteTargetId,
    isDeletingCategory: isDeleting,
    deleteError,
    closeDeleteDialog,
    confirmDeleteCategory: confirmDelete,
    requestDelete,
  };
}
