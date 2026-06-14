import { PropsWithChildren } from "react";

import { TemplateMain } from "@portal/ui/templates";

export const TemplateHomeMain = async ({ children }: PropsWithChildren) => (
  <TemplateMain className="large-desktop:gap-20 desktop:gap-15 tablet:gap-10 max-tablet:gap-8 only-tablet:pb-10 max-tablet:pb-8">
    {children}
  </TemplateMain>
);
