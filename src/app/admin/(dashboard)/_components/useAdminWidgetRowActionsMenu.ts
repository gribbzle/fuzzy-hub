"use client";

import { useAdminRowActionsMenu } from "./useAdminRowActionsMenu";

export function useAdminWidgetRowActionsMenu() {
  return useAdminRowActionsMenu({ menuSelector: "[data-widget-actions-menu]" });
}
