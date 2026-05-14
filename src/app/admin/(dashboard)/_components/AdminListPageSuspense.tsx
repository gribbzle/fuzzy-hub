"use client";

import { type ReactNode, Suspense } from "react";

const DEFAULT_FALLBACK = (
  <div className="p-4 sm:p-6 text-sm text-zinc-500">Loading...</div>
);

export function AdminListPageSuspense({
  children,
  fallback = DEFAULT_FALLBACK,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
