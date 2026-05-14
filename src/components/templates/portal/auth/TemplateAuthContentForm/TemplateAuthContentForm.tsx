import { PropsWithChildren } from "react";

import { twMerge } from "@utils";

import { Box } from "@portal/ui/atoms";

interface TemplateAuthContentFormProps extends PropsWithChildren {
  className?: string;
}

export const TemplateAuthContentForm = ({
  children,
  className,
}: TemplateAuthContentFormProps) => (
  <Box className={twMerge("gap-0 large-desktop:mx-5 tablet:mx-7.5", className)}>
    {children}
  </Box>
);
