import { ReactNode } from "react";

import { Header } from "@portal/ui/organisms";

const CustomerPortalLayout = ({
  children,
}: Readonly<{ children: ReactNode }>) => (
  <>
    <Header prefixHref="/demo" />
    {children}
  </>
);

export default CustomerPortalLayout;
