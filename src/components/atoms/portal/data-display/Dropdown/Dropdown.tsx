import { ReactNode } from "react";

import { twMerge } from "@utils";

interface DropdownProps {
  children?: ReactNode;
  open?: boolean;
  className?: string;
}

export const Dropdown = ({ children, open, className }: DropdownProps) => {
  if (!open) {
    return null;
  }

  return (
    <div
      className={twMerge(
        "border-border-gray shadow-dropdown absolute z-10 mt-2 w-full overflow-auto rounded-2xl border bg-white",
        className,
      )}
    >
      {children}
    </div>
  );
};
