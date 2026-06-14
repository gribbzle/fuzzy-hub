import { PropsWithChildren } from "react";

import { twMerge } from "@utils";

import { Box } from "@portal/ui/atoms";

interface TemplateAuthContentFooterProps extends PropsWithChildren {
  className?: string;
}

export const TemplateAuthContentFooter = ({
  children,
  className,
}: TemplateAuthContentFooterProps) => (
  <Box
    className={twMerge(
      "gap-5 items-stretch large-desktop:gap-6 max-tablet:gap-4",
      className,
    )}
  >
    {children}
  </Box>
);
