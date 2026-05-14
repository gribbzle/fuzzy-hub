import { ReactNode } from "react";

import { twMerge } from "@utils";

export interface FormHelperTextProps {
  children?: ReactNode;
  error?: boolean;
  className?: string;
}

export const FormHelperText = ({
  children,
  error,
  className,
}: FormHelperTextProps) => (
  <p className={twMerge("text-12 font-normal", error && "text-red", className)}>
    {children}
  </p>
);
