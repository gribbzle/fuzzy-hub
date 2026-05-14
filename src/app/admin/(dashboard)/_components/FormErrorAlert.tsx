import type { ReactNode } from "react";

import { cn } from "@utils";

export function FormErrorAlert({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600",
        className,
      )}
      role="alert"
    >
      {children}
    </p>
  );
}
