"use client";

import { useAdminRowActionsMenu } from "./useAdminRowActionsMenu";

export function useAdminQuizRowActionsMenu() {
  return useAdminRowActionsMenu({ menuSelector: "[data-quiz-actions-menu]" });
}
