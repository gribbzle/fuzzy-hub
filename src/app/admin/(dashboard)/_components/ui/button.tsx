import * as React from "react";

import { cn } from "@utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        variant === "default" &&
          "bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90",
        variant === "outline" &&
          "border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900",
        variant === "secondary" &&
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80",
        variant === "ghost" && "hover:bg-zinc-100 hover:text-zinc-900",
        size === "default" && "h-9 px-4 py-2",
        size === "sm" && "h-8 rounded-md px-3 text-xs",
        size === "icon" && "h-9 w-9",
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button };
