"use client";

import { useCallback } from "react";

import { useRouter } from "next/navigation";

/**
 * Opens `/admin/.../{id}/edit` in the same tab or a new tab (Ctrl/Cmd+click pattern).
 * @param basePath e.g. `/admin/quizzes` (no trailing slash)
 */
export function useAdminEntityEditNavigation(basePath: string) {
  const router = useRouter();

  return useCallback(
    (publicId: string, openInNewTab = false) => {
      const editUrl = `${basePath}/${encodeURIComponent(publicId)}/edit`;
      if (openInNewTab) {
        window.open(editUrl, "_blank", "noopener,noreferrer");
        return;
      }
      router.push(editUrl);
    },
    [router, basePath],
  );
}
