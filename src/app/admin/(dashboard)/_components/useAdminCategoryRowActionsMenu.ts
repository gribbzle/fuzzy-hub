"use client";

import { useAdminRowActionsMenu } from "./useAdminRowActionsMenu";

export function useAdminCategoryRowActionsMenu() {
  return useAdminRowActionsMenu({
    menuSelector: "[data-category-actions-menu]",
  });
}
