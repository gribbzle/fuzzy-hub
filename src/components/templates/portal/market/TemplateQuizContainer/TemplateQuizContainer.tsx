import { PropsWithChildren } from "react";

import { Container } from "@portal/ui/atoms";

export const TemplateQuizContainer = ({ children }: PropsWithChildren) => (
  <Container className="items-stretch gap-4 max-tablet:gap-3">
    {children}
  </Container>
);
