import { PropsWithChildren } from "react";

import { twMerge } from "@utils";

interface TemplateMainContentProps extends PropsWithChildren {
  className?: string;
}

export const TemplateMain = ({
  children,
  className,
}: TemplateMainContentProps) => (
  <main
    className={twMerge(
      "relative flex w-full flex-col bg-white font-sans",
      "large-desktop:pb-20 desktop:pt-8 desktop:pb-15 tablet:pb-7.5 pb-2.5",
      className,
    )}
  >
    {children}
  </main>
);
