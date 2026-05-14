"use client";

import type { ReactNode } from "react";

import { cn } from "@utils";

import { Button } from "./ui/button";
import { Modal } from "./ui/modal";

export interface AdminConfirmDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  titleId: string;
  description: ReactNode;
  descriptionId: string;
  /** When true, both actions are disabled and the confirm button shows a pending label. */
  isProcessing?: boolean;
  confirmLabel?: string;
  confirmPendingLabel?: string;
  cancelLabel?: string;
  /** When true, clicking the backdrop does not call `onCancel`. */
  backdropDismissDisabled?: boolean;
  panelClassName?: string;
  maxWidthClassName?: string;
}

export function AdminConfirmDialog({
  open,
  onCancel,
  onConfirm,
  title,
  titleId,
  description,
  descriptionId,
  isProcessing = false,
  confirmLabel = "Delete",
  confirmPendingLabel = "Deleting...",
  cancelLabel = "Cancel",
  backdropDismissDisabled = false,
  panelClassName,
  maxWidthClassName = "max-w-md",
}: AdminConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      backdropDismissDisabled={backdropDismissDisabled || isProcessing}
      role="alertdialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      panelClassName={cn(maxWidthClassName, panelClassName)}
    >
      <h3 id={titleId} className="text-lg font-semibold text-zinc-900">
        {title}
      </h3>
      <div id={descriptionId} className="mt-2 text-sm text-zinc-600">
        {description}
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isProcessing}
        >
          {cancelLabel}
        </Button>
        <Button
          type="button"
          className="bg-red-600 text-white hover:bg-red-700"
          onClick={onConfirm}
          disabled={isProcessing}
        >
          {isProcessing ? confirmPendingLabel : confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
