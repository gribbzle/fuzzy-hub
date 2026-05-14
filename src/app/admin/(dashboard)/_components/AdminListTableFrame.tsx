import type { ReactNode } from "react";

import { cn } from "@utils";

export const ADMIN_LIST_TABLE_FRAME_CLASS =
  "overflow-hidden rounded-md border border-zinc-200 bg-white";

interface AdminListTableFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * Bordered, rounded shell for list/detail tables. Pass `className` to adjust (e.g. omit `bg-white`).
 */
export function AdminListTableFrame({
  children,
  className,
}: AdminListTableFrameProps) {
  return (
    <div className={cn(ADMIN_LIST_TABLE_FRAME_CLASS, className)}>
      {children}
    </div>
  );
}
