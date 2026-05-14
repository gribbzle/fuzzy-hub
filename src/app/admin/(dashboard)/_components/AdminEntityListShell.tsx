"use client";

import type { ReactNode } from "react";

import NextLink from "next/link";

import { FormErrorAlert } from "./FormErrorAlert";
import { ADMIN_PRIMARY_BUTTON_CLASS } from "./adminTableUtils";

function renderListHeaderAction(
  headerActions: ReactNode | undefined,
  addHref: string | undefined,
  addLabel: string | undefined,
) {
  if (headerActions) {
    return headerActions;
  }
  if (addHref && addLabel) {
    return (
      <NextLink href={addHref} className={ADMIN_PRIMARY_BUTTON_CLASS}>
        {addLabel}
      </NextLink>
    );
  }
  return null;
}

interface AdminEntityListShellProps {
  title: string;
  addHref?: string;
  addLabel?: string;
  headerActions?: ReactNode;
  loadError: unknown;
  loadErrorFallback: string;
  deleteError: string | null;
  children: ReactNode;
}

export function AdminEntityListShell({
  title,
  addHref,
  addLabel,
  headerActions,
  loadError,
  loadErrorFallback,
  deleteError,
  children,
}: AdminEntityListShellProps) {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
          {title}
        </h2>
        {renderListHeaderAction(headerActions, addHref, addLabel)}
      </div>

      {loadError ? (
        <FormErrorAlert className="mb-4">
          {loadError instanceof Error ? loadError.message : loadErrorFallback}
        </FormErrorAlert>
      ) : null}
      {deleteError ? (
        <FormErrorAlert className="mb-4">{deleteError}</FormErrorAlert>
      ) : null}

      {children}
    </div>
  );
}
