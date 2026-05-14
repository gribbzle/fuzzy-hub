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
      "gap-5 items-stretch px-5",
      "large-desktop:gap-6 large-desktop:mx-5 max-tablet:gap-4 max-tablet:px-0 tablet:mx-7.5",
      className,
    )}
  >
    {children}
  </Box>
);
