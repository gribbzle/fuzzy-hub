import { PropsWithChildren } from "react";

import { RadioGroupProvider, RadioGroupProviderProps } from "@portal/contexts";
import { twMerge } from "@utils";

interface RadioGroupProps extends RadioGroupProviderProps, PropsWithChildren {
  className?: string;
}

export const RadioGroup = ({
  children,
  className,
  ...rest
}: RadioGroupProps) => (
  <RadioGroupProvider {...rest}>
    <div className={twMerge("flex flex-col", className)}>{children}</div>
  </RadioGroupProvider>
);
