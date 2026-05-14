"use client";

import type { ReactNode } from "react";

import { cn } from "@utils";

import { Modal } from "./ui/modal";

export interface AdminModalProps {
  open: boolean;
  onClose: () => void;
  /** When true, clicking the backdrop does not call `onClose` (e.g. while a request is in flight). */
  backdropDismissDisabled?: boolean;
  titleId: string;
  title: string;
  description?: string;
  children: ReactNode;
  overlayClassName?: string;
  panelClassName?: string;
}

export function AdminModal({
  open,
  onClose,
  backdropDismissDisabled = false,
  titleId,
  title,
  description,
  children,
  overlayClassName,
  panelClassName,
}: AdminModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      backdropDismissDisabled={backdropDismissDisabled}
      role="dialog"
      aria-labelledby={titleId}
      overlayClassName={overlayClassName}
      panelClassName={cn("max-w-xl", panelClassName)}
    >
      <h3 id={titleId} className="text-lg font-semibold text-zinc-900">
        {title}
      </h3>
      {description ? (
        <p className="mt-1 text-sm text-zinc-600">{description}</p>
      ) : null}
      {children}
    </Modal>
  );
}
