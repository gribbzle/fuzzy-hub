import { ReactNode } from "react";

import { Footer } from "@portal/ui/organisms";

import { getFooterWidgetAction } from "@portal/market/actions";

const WithFooterLayout = async ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const footerWidget = await getFooterWidgetAction();

  return (
    <>
      {children}
      {footerWidget && <Footer data={footerWidget.data} />}
    </>
  );
};

export default WithFooterLayout;
