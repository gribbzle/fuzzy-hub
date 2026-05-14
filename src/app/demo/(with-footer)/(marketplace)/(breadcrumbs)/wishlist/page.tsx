import { Container, Tab, Tabs } from "@portal/ui/atoms";
import { TemplateMain } from "@portal/ui/templates";

import { PageHeader, ProductsGrid } from "@portal/market/ui/organisms";

import pageHeaderMock from "./_mocks/pageHeader.mock";
import petsMock from "./_mocks/pets.mock";
import tabsMock from "./_mocks/tabs.mock";

const WishlistDemoPage = () => (
  <TemplateMain>
    <PageHeader {...pageHeaderMock} />
    <Container className="gap-8 pt-8 pb-20">
      <Tabs size="large" defaultValue={tabsMock[0].value}>
        {tabsMock.map((tab) => (
          <Tab key={tab.value} {...tab} />
        ))}
      </Tabs>
      <ProductsGrid items={petsMock} />
    </Container>
  </TemplateMain>
);

export default WishlistDemoPage;
