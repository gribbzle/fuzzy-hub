import { PropsWithChildren } from "react";

import { twMerge } from "@utils";

interface FormGroupProps extends PropsWithChildren {
  className?: string;
}

export const FormGroup = ({ children, className }: FormGroupProps) => (
  <div className={twMerge("flex flex-col gap-7", className)}>{children}</div>
);
