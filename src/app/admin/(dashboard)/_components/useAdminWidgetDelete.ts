"use client";

import { useAdminResourceDelete } from "./useAdminResourceDelete";

export function useAdminWidgetDelete(mutate: () => Promise<unknown>) {
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
      `/admin/widgets/${encodeURIComponent(publicId)}`,
    fallbackErrorMessage: "Failed to delete widget.",
    successMessage: "Widget deleted successfully.",
  });

  return {
    deleteTargetWidgetId: deleteTargetId,
    isDeletingWidget: isDeleting,
    deleteError,
    closeDeleteDialog,
    confirmDeleteWidget: confirmDelete,
    requestDelete,
  };
}
