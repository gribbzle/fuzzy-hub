import { PropsWithChildren } from "react";

import { twMerge } from "@utils";

interface FormControlProps extends PropsWithChildren {
  className?: string;
}

export const FormControl = ({ children, className }: FormControlProps) => (
  <div className={twMerge("flex flex-col gap-1", className)}>{children}</div>
);
