"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ADMIN_ROW_ACTIONS_MENU_GAP_PX } from "./adminTableUtils";

interface UseAdminRowActionsMenuOptions {
  menuSelector: string;
}

export function useAdminRowActionsMenu({
  menuSelector,
}: UseAdminRowActionsMenuOptions) {
  const [openActionsId, setOpenActionsId] = useState<string | null>(null);
  const [openActionsPosition, setOpenActionsPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const actionTriggerRefs = useRef<Record<string, HTMLButtonElement | null>>(
    {},
  );

  useEffect(() => {
    if (!openActionsId) {
      return;
    }

    const onMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest(menuSelector)) {
        setOpenActionsId(null);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenActionsId(null);
      }
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [menuSelector, openActionsId]);

  const updateOpenActionsPosition = useCallback((publicId: string | null) => {
    if (!publicId) {
      setOpenActionsPosition(null);
      return;
    }

    const trigger = actionTriggerRefs.current[publicId];
    if (!trigger) {
      setOpenActionsPosition(null);
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();
    setOpenActionsPosition({
      top: triggerRect.bottom + ADMIN_ROW_ACTIONS_MENU_GAP_PX,
      left: triggerRect.right,
    });
  }, []);

  useEffect(() => {
    if (!openActionsId) {
      return;
    }

    const onReposition = () => {
      updateOpenActionsPosition(openActionsId);
    };

    const rafId = window.requestAnimationFrame(onReposition);
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [openActionsId, updateOpenActionsPosition]);

  return {
    openActionsId,
    setOpenActionsId,
    openActionsPosition,
    actionTriggerRefs,
  };
}
