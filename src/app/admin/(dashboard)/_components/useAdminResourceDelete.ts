"use client";

import { useCallback, useState } from "react";

import { adminJsonRequest } from "../_utils/adminJsonRequest";
import { useAdminNotifications } from "./AdminNotifications";

interface UseAdminResourceDeleteOptions {
  mutate: () => Promise<unknown>;
  getDeletePath: (publicId: string) => string;
  fallbackErrorMessage: string;
  successMessage: string;
}

export function useAdminResourceDelete({
  mutate,
  getDeletePath,
  fallbackErrorMessage,
  successMessage,
}: UseAdminResourceDeleteOptions) {
  const { notifySuccess, notifyError } = useAdminNotifications();
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const closeDeleteDialog = useCallback(() => {
    if (isDeleting) {
      return;
    }
    setDeleteTargetId(null);
  }, [isDeleting]);

  const confirmDelete = useCallback(async () => {
    if (!deleteTargetId) {
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    const deletePath = getDeletePath(deleteTargetId);

    const result = await adminJsonRequest({
      path: deletePath,
      method: "DELETE",
      networkErrorMessage: fallbackErrorMessage,
      httpErrorFallback: fallbackErrorMessage,
    });

    if (!result.ok) {
      if (result.kind === "unauthorized") {
        setIsDeleting(false);
        return;
      }
      setDeleteError(result.message);
      notifyError(result.message);
      setIsDeleting(false);
      return;
    }

    setDeleteTargetId(null);
    setIsDeleting(false);
    await mutate();
    notifySuccess(successMessage);
  }, [
    deleteTargetId,
    fallbackErrorMessage,
    getDeletePath,
    mutate,
    notifyError,
    notifySuccess,
    successMessage,
  ]);

  const requestDelete = useCallback((publicId: string) => {
    setDeleteError(null);
    setDeleteTargetId(publicId);
  }, []);

  return {
    deleteTargetId,
    isDeleting,
    deleteError,
    closeDeleteDialog,
    confirmDelete,
    requestDelete,
  };
}
