import { twMerge } from "@utils";

import {
  Box,
  Container,
  Tab,
  TabProps,
  Tabs,
  Typography,
} from "@portal/ui/atoms";

import {
  ListingCard,
  Paginator,
  Pet,
  Service,
} from "@portal/market/ui/molecules";

export interface FeaturedListingProps {
  items: Pet[] | Service[];
  tabs: TabProps[];
  className?: string;
  title: string;
  subtitle: string;
}

export const FeaturedListingSection = ({
  title,
  subtitle,
  items,
  tabs,
  className,
}: FeaturedListingProps) => (
  <section className={twMerge("bg-bg-light large-desktop:py-15", className)}>
    <Container className="gap-11">
      <Box className="gap-4">
        <Typography variant="h2">{title}</Typography>
        <Typography variant="subtitle">{subtitle}</Typography>
      </Box>
      <div className="flex items-center justify-between">
        <Tabs size="large" defaultValue="">
          {tabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
        <Paginator />
      </div>
      <div className="flex justify-between">
        {items.map((item) => (
          <ListingCard key={item.id} item={item} />
        ))}
      </div>
    </Container>
  </section>
);
