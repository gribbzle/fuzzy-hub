import { PropsWithChildren } from "react";

import { TemplateMain } from "@portal/ui/templates";

export const TemplateHomeMain = async ({ children }: PropsWithChildren) => (
  <TemplateMain className="pt-0! tablet:-mt-25 large-desktop:gap-20 desktop:gap-15 tablet:gap-10 max-tablet:gap-8 large-desktop:pb-20 desktop:pb-15 tablet:pb-10 max-tablet:pb-8">
    {children}
  </TemplateMain>
);
