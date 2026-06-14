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
      "tablet:-mt-25 large-desktop:pb-20 only-desktop:pb-15 only-tablet:pb-7.5 max-tablet:pb-2.5",
      className,
    )}
  >
    {children}
  </main>
);
