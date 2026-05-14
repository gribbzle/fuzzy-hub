import { ReactNode } from "react";

import { Header } from "@portal/ui/organisms";

const NoBreadcrumbsLayout = ({
  children,
}: Readonly<{ children: ReactNode }>) => (
  <>
    <Header prefixHref="/demo" />
    {children}
  </>
);

export default NoBreadcrumbsLayout;
