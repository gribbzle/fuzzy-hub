"use client";

import { createPortal } from "react-dom";

interface AdminRowActionsPortalProps {
  openEntityId: string | null;
  position: { top: number; left: number } | null;
  onEdit: (publicId: string) => void;
  /** When omitted or true, show Delete. When false, edit-only menu (e.g. admin users). */
  showDelete?: boolean;
  onRequestDelete?: (publicId: string) => void;
  menuDataAttribute?:
    | "quiz"
    | "widget"
    | "quiz-profile"
    | "dictionary"
    | "dictionary-item"
    | "characteristic"
    | "category"
    | "user"
    | "user-profile";
}

export function AdminRowActionsPortal({
  openEntityId,
  position,
  onEdit,
  showDelete = true,
  onRequestDelete,
  menuDataAttribute,
}: AdminRowActionsPortalProps) {
  if (!openEntityId || !position || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed z-50 min-w-36 -translate-x-full rounded-md border border-zinc-200 bg-white p-1 text-left"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      data-quiz-actions-menu={menuDataAttribute === "quiz" ? true : undefined}
      data-widget-actions-menu={
        menuDataAttribute === "widget" ? true : undefined
      }
      data-quiz-profile-actions-menu={
        menuDataAttribute === "quiz-profile" ? true : undefined
      }
      data-dictionary-actions-menu={
        menuDataAttribute === "dictionary" ? true : undefined
      }
      data-dictionary-item-actions-menu={
        menuDataAttribute === "dictionary-item" ? true : undefined
      }
      data-characteristic-actions-menu={
        menuDataAttribute === "characteristic" ? true : undefined
      }
      data-category-actions-menu={
        menuDataAttribute === "category" ? true : undefined
      }
      data-user-actions-menu={menuDataAttribute === "user" ? true : undefined}
      data-user-profile-actions-menu={
        menuDataAttribute === "user-profile" ? true : undefined
      }
    >
      <button
        type="button"
        className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-zinc-100"
        onClick={(event) => {
          event.stopPropagation();
          onEdit(openEntityId);
        }}
      >
        Edit
      </button>
      {showDelete && onRequestDelete ? (
        <button
          type="button"
          className="w-full rounded-sm px-2 py-1.5 text-left text-sm text-red-600 hover:bg-zinc-100"
          onClick={(event) => {
            event.stopPropagation();
            onRequestDelete(openEntityId);
          }}
        >
          Delete
        </button>
      ) : null}
    </div>,
    document.body,
  );
}
