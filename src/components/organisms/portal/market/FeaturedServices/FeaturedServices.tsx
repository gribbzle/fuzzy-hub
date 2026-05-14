import { twMerge } from "@utils";

import {
  Container,
  MenuLink,
  Tab,
  TabProps,
  Tabs,
  Typography,
} from "@portal/ui/atoms";
import { ArrowRightLong } from "@portal/ui/icons";

import { ListingCard, Service } from "@portal/market/ui/molecules";

export interface FeaturedServicesProps {
  title: string;
  tabs: TabProps[];
  items: Service[];
  className?: string;
}

export const FeaturedServices = ({
  title,
  tabs,
  items,
  className,
}: FeaturedServicesProps) => (
  <Container className={twMerge("gap-11", className)} component="section">
    <div className="flex items-center justify-between">
      <div className="flex gap-8">
        <Typography variant="h2">{title}</Typography>
        <Tabs size="medium" defaultValue="">
          {tabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      </div>
      <MenuLink>
        Find a Service Near You <ArrowRightLong aria-hidden="true" />
      </MenuLink>
    </div>
    <div className="flex justify-between">
      {items.map((service) => (
        <ListingCard
          key={service.id}
          item={service}
          variant="outlined"
          className="bg-bg-light"
        />
      ))}
    </div>
  </Container>
);
