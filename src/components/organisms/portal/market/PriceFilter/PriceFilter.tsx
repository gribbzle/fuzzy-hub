"use client";

import { twMerge } from "@utils";

import { Button, Slider } from "@portal/ui/atoms";

import { FilterInputLabel } from "@portal/market/ui/molecules";

export interface PriceFilterProps {
  title: string;
  min: number;
  max: number;
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  onApply?: () => void;
  className?: string;
}

export const PriceFilter = ({
  title,
  min,
  max,
  value,
  onChange,
  onApply,
  className,
}: PriceFilterProps) => {
  const [minValue, maxValue] = value ?? [min, max];

  return (
    <div className={twMerge("flex flex-col gap-3", className)}>
      <FilterInputLabel label={title} />
      <div className="px-2.5">
        <Slider
          range
          min={min}
          max={max}
          defaultValue={[min, max]}
          onChange={(nextValue) => onChange?.(nextValue as [number, number])}
        />
      </div>
      <div className="flex items-end justify-between gap-4">
        <p className="text-16 text-text-default font-bold">
          Price: ${minValue} - ${maxValue}
        </p>
        <Button variant="primary" size="mini" onClick={onApply}>
          Apply
        </Button>
      </div>
    </div>
  );
};
