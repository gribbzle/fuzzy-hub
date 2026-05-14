import { PropsWithChildren } from "react";

import { twMerge } from "@utils";

interface ProfileProps extends PropsWithChildren {
  className?: string;
}

export const Paper = ({ children, className }: ProfileProps) => (
  <div
    className={twMerge(
      "border-border-light rounded-4xl border bg-white",
      className,
    )}
  >
    {children}
  </div>
);
