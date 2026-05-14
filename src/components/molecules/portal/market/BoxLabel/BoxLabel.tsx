import { ReactNode } from "react";

import { Typography } from "@portal/ui/atoms";

interface BoxLabelProps {
  children: ReactNode;
}

export const BoxLabel = ({ children }: BoxLabelProps) => (
  <Typography variant="h4">{children}</Typography>
);
