import { PropsWithChildren } from "react";

import { twMerge } from "@utils";

import { Box, Typography } from "@portal/ui/atoms";

interface TemplateAuthContentHeaderProps extends PropsWithChildren {
  title: string;
  subtitle: string;
  className?: string;
}

export const TemplateAuthContentHeader = ({
  title,
  subtitle,
  className,
}: TemplateAuthContentHeaderProps) => (
  <Box
    className={twMerge(
      "large-desktop:gap-3 tablet:gap-2 max-tablet:gap-3",
      className,
    )}
  >
    <Typography variant="h2" className="text-center">
      {title}
    </Typography>
    <p className="text-18 text-text-secondary text-center font-semibold max-tablet:text-16">
      {subtitle}
    </p>
  </Box>
);
