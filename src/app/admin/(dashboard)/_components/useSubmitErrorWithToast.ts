"use client";

import { useCallback } from "react";

import { useAdminNotifications } from "./AdminNotifications";

/**
 * Pairs local submit error state with a toast so API helpers can report failures consistently.
 */
export function useSubmitErrorWithToast(
  setSubmitError: (value: string | null) => void,
) {
  const { notifyError } = useAdminNotifications();

  return useCallback(
    (value: string | null) => {
      setSubmitError(value);
      if (value) {
        notifyError(value);
      }
    },
    [setSubmitError, notifyError],
  );
}
