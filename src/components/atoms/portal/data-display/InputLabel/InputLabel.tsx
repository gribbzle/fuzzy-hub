import { PropsWithChildren } from "react";

import { twMerge } from "@utils";

interface InputLabelProps extends PropsWithChildren {
  className?: string;
}

export const InputLabel = ({ children, className }: InputLabelProps) => (
  <label
    className={twMerge("text-12 text-text-secondary font-semibold", className)}
  >
    {children}
  </label>
);
