"use client";

import { AdminConfirmDialog } from "./AdminConfirmDialog";

interface AdminResourceDeleteDialogProps {
  resourceLabel:
    | "quiz"
    | "widget"
    | "quiz-profile"
    | "dictionary"
    | "dictionary-item"
    | "characteristic"
    | "category";
  resourceId: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function AdminResourceDeleteDialog({
  resourceLabel,
  resourceId,
  isDeleting,
  onCancel,
  onConfirm,
}: AdminResourceDeleteDialogProps) {
  const noun =
    resourceLabel === "quiz"
      ? "Quiz"
      : resourceLabel === "widget"
        ? "Widget"
        : resourceLabel === "dictionary"
          ? "Dictionary"
          : resourceLabel === "dictionary-item"
            ? "Dictionary item"
            : resourceLabel === "characteristic"
              ? "Characteristic"
              : resourceLabel === "category"
                ? "Category"
                : "Quiz profile";
  const title =
    resourceLabel === "quiz-profile"
      ? "Delete quiz profile?"
      : resourceLabel === "dictionary"
        ? "Delete dictionary?"
        : resourceLabel === "dictionary-item"
          ? "Delete dictionary item?"
          : resourceLabel === "characteristic"
            ? "Delete characteristic?"
            : resourceLabel === "category"
              ? "Delete category?"
              : `Delete ${resourceLabel}?`;
  const titleId = `delete-${resourceLabel}-title`;
  const descriptionId = `delete-${resourceLabel}-description`;

  return (
    <AdminConfirmDialog
      open
      title={title}
      titleId={titleId}
      descriptionId={descriptionId}
      description={
        <>
          This action cannot be undone. {noun}{" "}
          <span className="font-mono text-xs">{resourceId}</span> will be
          permanently removed.
        </>
      }
      onCancel={onCancel}
      onConfirm={onConfirm}
      isProcessing={isDeleting}
    />
  );
}
