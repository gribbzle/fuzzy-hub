import { ReactNode } from "react";

// import { AgreementCookie } from "@portal/market/ui/organisms";

// import agreementCookieMock from "./_mocks/agreementCookie.mock";

const MarketplaceLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <>
    {children}
    {/*<AgreementCookie {...agreementCookieMock} />*/}
  </>
);

export default MarketplaceLayout;
