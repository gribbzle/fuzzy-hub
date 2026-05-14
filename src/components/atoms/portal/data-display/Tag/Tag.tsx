import { PropsWithChildren } from "react";

import { twMerge } from "@utils";

interface TagProps extends PropsWithChildren {
  size?: "small" | "medium" | "large";
}

export const Tag = ({ children, size = "medium" }: TagProps) => (
  <div
    className={twMerge(
      "border-border-light bg-bg-default box-border flex w-fit items-center justify-center gap-2 rounded-lg border px-2",
      size === "small" && "h-7",
      size === "medium" && "h-7.5",
      size === "large" && "h-10",
    )}
  >
    <p
      className={twMerge(
        "text-text-default font-medium",
        size === "small" && "text-14",
        size === "medium" && "text-16",
        size === "large" && "text-16",
      )}
    >
      {children}
    </p>
  </div>
);
