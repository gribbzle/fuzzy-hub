"use client";

import { twMerge } from "@utils";

import { Tab, TabProps, Tabs } from "@portal/ui/atoms";

import { FilterCardItem, Paginator } from "@portal/market/ui/molecules";

import { FilterCardGroup } from "./FilterCardGroup";

export interface CategorySectionProps {
  tabs: TabProps[];
  tabsDefaultValue: string;
  categories: FilterCardItem[];
  categoriesDefaultValue?: string;
  onFilterChange?: (categoryId: string | number) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  className?: string;
}

export const CategorySection = ({
  tabsDefaultValue,
  tabs,
  categoriesDefaultValue,
  categories,
  onFilterChange,
  onNextClick,
  onPrevClick,
  className,
}: CategorySectionProps) => (
  <section className={twMerge("flex flex-col gap-8", className)}>
    <div className="flex items-center justify-between">
      <Tabs size="large" defaultValue={tabsDefaultValue}>
        {tabs.map((tab) => (
          <Tab key={tab.value} {...tab} />
        ))}
      </Tabs>
      <Paginator onNextBtnClick={onNextClick} onPrevBtnClick={onPrevClick} />
    </div>
    <FilterCardGroup
      categories={categories}
      onChange={onFilterChange}
      value={categoriesDefaultValue}
    />
  </section>
);
