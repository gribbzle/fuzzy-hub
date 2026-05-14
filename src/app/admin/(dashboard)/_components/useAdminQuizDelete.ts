"use client";

import { useAdminResourceDelete } from "./useAdminResourceDelete";

export function useAdminQuizDelete(mutate: () => Promise<unknown>) {
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
      `/admin/quizzes/${encodeURIComponent(publicId)}`,
    fallbackErrorMessage: "Failed to delete quiz.",
    successMessage: "Quiz deleted successfully.",
  });

  return {
    deleteTargetQuizId: deleteTargetId,
    isDeletingQuiz: isDeleting,
    deleteError,
    closeDeleteDialog,
    confirmDeleteQuiz: confirmDelete,
    requestDelete,
  };
}
