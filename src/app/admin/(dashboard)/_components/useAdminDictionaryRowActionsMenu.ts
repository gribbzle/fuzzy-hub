"use client";

import { useAdminRowActionsMenu } from "./useAdminRowActionsMenu";

export function useAdminDictionaryRowActionsMenu() {
  return useAdminRowActionsMenu({
    menuSelector: "[data-dictionary-actions-menu]",
  });
}
