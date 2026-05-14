import { ReactNode } from "react";

import { twMerge } from "@utils";

import { Box, Container } from "@portal/ui/atoms";

interface TemplateHeroContainerProps {
  slider?: ReactNode;
  banner?: ReactNode;
  className?: string;
}

export const TemplateHeroContainer = ({
  slider,
  banner,
  className,
}: TemplateHeroContainerProps) => {
  if (!slider && !banner) {
    return null;
  }

  return (
    <Box
      className={twMerge(
        "large-desktop:gap-8 desktop:gap-5 tablet:gap-10 max-tablet:gap-8 large-desktop:-mt-29 desktop:-mt-23.25 max-desktop:-mt-15.75",
        className,
      )}
    >
      <Container
        component="section"
        className="tablet:max-w-auto max-tablet:px-0"
      >
        {slider}
      </Container>
      <Container>{banner}</Container>
    </Box>
  );
};
