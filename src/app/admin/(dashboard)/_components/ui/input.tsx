import * as React from "react";

import { cn } from "@utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * `default` — h-10, matches primary admin forms.
   * `compact` — h-9, for dense layouts (e.g. table toolbars, modals with tight grids).
   */
  inputSize?: "default" | "compact";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize = "default", type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none transition-colors",
        "focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200",
        "disabled:cursor-not-allowed disabled:opacity-50",
        inputSize === "default" && "h-10",
        inputSize === "compact" && "h-9",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
