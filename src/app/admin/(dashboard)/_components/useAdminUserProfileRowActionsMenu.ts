"use client";

import { useAdminRowActionsMenu } from "./useAdminRowActionsMenu";

export function useAdminUserProfileRowActionsMenu() {
  return useAdminRowActionsMenu({
    menuSelector: "[data-user-profile-actions-menu]",
  });
}
