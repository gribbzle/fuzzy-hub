"use client";

import { useAdminResourceDelete } from "./useAdminResourceDelete";

export function useAdminQuizProfileDelete(mutate: () => Promise<unknown>) {
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
      `/admin/quiz-profiles/${encodeURIComponent(publicId)}`,
    fallbackErrorMessage: "Failed to delete quiz profile.",
    successMessage: "Quiz profile deleted successfully.",
  });

  return {
    deleteTargetQuizProfileId: deleteTargetId,
    isDeletingQuizProfile: isDeleting,
    deleteError,
    closeDeleteDialog,
    confirmDeleteQuizProfile: confirmDelete,
    requestDelete,
  };
}
