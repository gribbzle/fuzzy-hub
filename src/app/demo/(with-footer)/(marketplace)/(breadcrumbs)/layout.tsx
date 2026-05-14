import { ReactNode } from "react";

import { Header } from "@portal/ui/organisms";

const BreadcrumbsLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <>
    <div className="bg-bg-light relative z-101 h-4" />
    <div className="fixed top-0 right-0 left-0 z-100 h-21 bg-white" />
    <Header className="bg-transparent" />
    {children}
  </>
);

export default BreadcrumbsLayout;
