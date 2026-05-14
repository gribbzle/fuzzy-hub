import { PropsWithChildren } from "react";

import { twMerge } from "@utils";

import { Box } from "@portal/ui/atoms";

interface TemplateAuthContent extends PropsWithChildren {
  className?: string;
}

export const TemplateAuthContent = ({
  className,
  children,
}: TemplateAuthContent) => (
  <Box
    className={twMerge(
      "gap-5 w-full",
      "large-desktop:gap-6 max-desktop:py-15 max-tablet:px-4 tablet:max-w-115 max-tablet:pt-4 max-tablet:pb-10 mx-auto max-desktop:mb-auto",
      className,
    )}
  >
    {children}
  </Box>
);
