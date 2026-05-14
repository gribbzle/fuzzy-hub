"use client";

import type { ReactNode } from "react";

import { cn } from "@utils";

const overlayClassName =
  "fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 p-4";

const panelBaseClassName =
  "w-full rounded-lg border border-zinc-200 bg-white p-6";

export interface ModalProps {
  open: boolean;
  /** Called when the user dismisses via the backdrop (not the panel). */
  onClose: () => void;
  /** When true, backdrop clicks do not call `onClose`. */
  backdropDismissDisabled?: boolean;
  role?: "dialog" | "alertdialog";
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  children: ReactNode;
  overlayClassName?: string;
  panelClassName?: string;
}

/**
 * Overlay + panel shell for admin modals. Use for form modals (`role="dialog"`) or
 * confirmations (`role="alertdialog"`). Compose header, body, and actions as `children`.
 */
export function Modal({
  open,
  onClose,
  backdropDismissDisabled = false,
  role = "dialog",
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  children,
  overlayClassName: overlayClassNameProp,
  panelClassName,
}: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className={cn(overlayClassName, overlayClassNameProp)}
      role="presentation"
      onClick={() => {
        if (!backdropDismissDisabled) {
          onClose();
        }
      }}
    >
      <div
        role={role}
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        className={cn(panelBaseClassName, panelClassName)}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
