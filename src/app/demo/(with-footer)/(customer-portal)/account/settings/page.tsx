import { Container } from "@portal/ui/atoms";
import { TemplateMain } from "@portal/ui/templates";

import { PageHeader } from "@portal/market/ui/organisms";

import {
  AccountSecurity,
  ProfileSettings,
} from "@portal/customer/ui/organisms";

import pageHeaderMock from "./_mocks/pageHeader.mock";
import profileMock from "./_mocks/profile.mock";

const AccountDemoPage = () => (
  <TemplateMain>
    <PageHeader {...pageHeaderMock} />
    <Container className="flex-row gap-8 pt-8 pb-20">
      <ProfileSettings className="flex-1" {...profileMock} />
      <AccountSecurity className="flex-1" />
    </Container>
  </TemplateMain>
);

export default AccountDemoPage;
