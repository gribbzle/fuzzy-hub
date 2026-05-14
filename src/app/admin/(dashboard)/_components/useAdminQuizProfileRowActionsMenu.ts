"use client";

import { useAdminRowActionsMenu } from "./useAdminRowActionsMenu";

export function useAdminQuizProfileRowActionsMenu() {
  return useAdminRowActionsMenu({
    menuSelector: "[data-quiz-profile-actions-menu]",
  });
}
