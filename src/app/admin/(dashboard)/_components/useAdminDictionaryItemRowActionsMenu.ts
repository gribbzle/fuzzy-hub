"use client";

import { useAdminRowActionsMenu } from "./useAdminRowActionsMenu";

export function useAdminDictionaryItemRowActionsMenu() {
  return useAdminRowActionsMenu({
    menuSelector: "[data-dictionary-item-actions-menu]",
  });
}
