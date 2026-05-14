import type { ReactNode } from "react";

import { cn } from "@utils";

interface FormFieldProps {
  id?: string;
  label?: string;
  helperText?: ReactNode;
  errorMessage?: unknown;
  className?: string;
  labelClassName?: string;
  children: ReactNode;
}

export function FormField({
  id,
  label,
  helperText,
  errorMessage,
  className,
  labelClassName,
  children,
}: FormFieldProps) {
  const hasError = Boolean(errorMessage);

  return (
    <div className={cn("space-y-2", className)}>
      {label ? (
        <label
          htmlFor={id}
          className={cn("text-sm font-medium text-zinc-700", labelClassName)}
        >
          {label}
        </label>
      ) : null}
      {children}
      {hasError ? (
        <p className="text-xs text-red-600">{String(errorMessage)}</p>
      ) : helperText ? (
        <p className="text-xs text-zinc-500">{helperText}</p>
      ) : null}
    </div>
  );
}
