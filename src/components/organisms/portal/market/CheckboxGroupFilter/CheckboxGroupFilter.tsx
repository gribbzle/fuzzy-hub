"use client";

import { CheckboxProps } from "@portal/ui/atoms";

import {
  FilterCheckboxItem,
  FilterInputLabel,
} from "@portal/market/ui/molecules";

interface Item extends Pick<
  CheckboxProps,
  "id" | "name" | "checked" | "value"
> {
  label: string;
  count: number;
}

export interface CheckboxGroupFilterProps {
  title: string;
  items: Item[];
  className?: string;
}

export const CheckboxGroupFilter = ({
  title,
  items,
  className,
}: CheckboxGroupFilterProps) => (
  <div className={className}>
    <div className="flex flex-col gap-4">
      <FilterInputLabel label={title} />
      <div className="flex flex-col gap-3 pl-3">
        {items.map((item, index) => (
          <FilterCheckboxItem
            key={index}
            label={item.label}
            count={item.count}
            slotProps={{
              checkbox: {
                checked: item.checked,
              },
            }}
          />
        ))}
      </div>
    </div>
  </div>
);
