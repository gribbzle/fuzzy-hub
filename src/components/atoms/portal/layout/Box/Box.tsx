import React, { ReactNode } from "react";

import { twMerge } from "@utils";

interface BoxProps {
  children: ReactNode;
  className?: string;
}

export const Box = ({ children, className }: BoxProps) => (
  <div className={twMerge("flex flex-col gap-6", className)}>{children}</div>
);
