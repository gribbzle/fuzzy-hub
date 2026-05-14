"use client";

import { twMerge } from "@utils";

import { CheckboxProps } from "@portal/ui/atoms";
// TODO: молекула не может ссылаться на молекулу
import { CheckboxField } from "@portal/ui/molecules";

export interface FilterCheckboxItemProps {
  label: string;
  count?: number;
  slotProps?: {
    checkbox?: CheckboxProps;
  };
  className?: string;
}

export const FilterCheckboxItem = ({
  label,
  count,
  className,
}: FilterCheckboxItemProps) => (
  <div
    className={twMerge("flex items-center justify-between gap-2", className)}
  >
    <CheckboxField name="test" label={label} />
    {count && (
      <div className="text-14 text-primary flex h-5 items-center justify-center rounded-xl bg-white px-2 font-medium">
        {count}
      </div>
    )}
  </div>
);
