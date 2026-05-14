"use client";

import { twMerge } from "@utils";

import {
  FilterCardGroupContextType,
  FilterCardGroupProvider,
} from "@portal/market/contexts";
import { FilterCard, FilterCardItem } from "@portal/market/ui/molecules";

interface FilterCardGroupProps extends FilterCardGroupContextType {
  categories: FilterCardItem[];
  className?: string;
}

export const FilterCardGroup = ({
  categories,
  className,
  ...rest
}: FilterCardGroupProps) => (
  <FilterCardGroupProvider {...rest}>
    <div className={twMerge("flex justify-between", className)}>
      {categories.map((category) => (
        <FilterCard key={category.value} {...category} />
      ))}
    </div>
  </FilterCardGroupProvider>
);
