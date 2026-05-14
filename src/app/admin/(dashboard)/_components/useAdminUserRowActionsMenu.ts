"use client";

import { useAdminRowActionsMenu } from "./useAdminRowActionsMenu";

export function useAdminUserRowActionsMenu() {
  return useAdminRowActionsMenu({
    menuSelector: "[data-user-actions-menu]",
  });
}
