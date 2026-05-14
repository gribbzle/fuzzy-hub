import { ReactNode } from "react";

import { FOOTER_MOCK } from "@portal/mocks";

import { Footer } from "@portal/ui/organisms";

const WithFooterDemoLayout = ({
  children,
}: Readonly<{ children: ReactNode }>) => (
  <>
    {children}
    <Footer logoHref="/demo" data={FOOTER_MOCK} />
  </>
);

export default WithFooterDemoLayout;
