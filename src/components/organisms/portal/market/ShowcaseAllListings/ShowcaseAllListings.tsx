"use client";

import { twMerge } from "@utils";

import { Tab, TabProps, Tabs, Typography } from "@portal/ui/atoms";

import { ListingCard, Pet, Service } from "@portal/market/ui/molecules";

export interface ShowcaseAllListingsProps {
  title: string;
  items: Pet[] | Service[];
  tabs: TabProps[];
  className?: string;
  activeTab: string;
}

export const ShowcaseAllListings = ({
  title,
  items,
  tabs,
  className,
  activeTab,
}: ShowcaseAllListingsProps) => (
  <section className={twMerge("flex justify-center bg-white", className)}>
    <div className="flex w-full max-w-420 flex-col gap-11">
      <div className="flex items-center gap-8">
        <Typography variant="h1" component="p">
          {title}
        </Typography>
        <Tabs size="medium" defaultValue={activeTab} className="gap-2">
          {tabs.map((tab) => (
            <Tab key={tab.value} {...tab} />
          ))}
        </Tabs>
      </div>
      <div className="flex justify-between gap-4">
        {items.map((item) => (
          <ListingCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  </section>
);
