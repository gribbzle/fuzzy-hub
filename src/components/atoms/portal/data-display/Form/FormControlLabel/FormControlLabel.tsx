import { ReactElement, ReactNode } from "react";

import { twMerge } from "@utils";

interface FormControlLabelProps {
  id: string;
  control: ReactElement;
  label: ReactNode;
  className?: string;
}

export const FormControlLabel = ({
  id,
  control,
  label,
  className,
}: FormControlLabelProps) => (
  <div className="flex items-start gap-2">
    {control}
    <label
      className={twMerge(
        "text-16 text-text-default cursor-pointer font-semibold",
        className,
      )}
      htmlFor={id}
    >
      {label}
    </label>
  </div>
);
