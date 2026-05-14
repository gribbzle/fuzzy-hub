import { PropsWithChildren } from "react";

import { TemplateMain } from "@portal/ui/templates";

export const TemplateQuizMain = async ({ children }: PropsWithChildren) => (
  <TemplateMain className="max-desktop:pt-6! max-tablet:pt-4! max-desktop:pb-10! max-tablet:pb-6!">
    {children}
  </TemplateMain>
);
