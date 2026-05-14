"use client";

import { useAdminRowActionsMenu } from "./useAdminRowActionsMenu";

export function useAdminCharacteristicRowActionsMenu() {
  return useAdminRowActionsMenu({
    menuSelector: "[data-characteristic-actions-menu]",
  });
}
