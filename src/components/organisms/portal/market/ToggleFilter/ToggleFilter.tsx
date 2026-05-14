"use client";

import { twMerge } from "@utils";

import { FormControl, FormControlLabel, Toggle } from "@portal/ui/atoms";

import { FilterInputLabel } from "@portal/market/ui/molecules";

export interface ToggleFilterProps {
  title: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const ToggleFilter = ({
  title,
  label,
  checked,
  onChange,
  className,
}: ToggleFilterProps) => (
  <FormControl className={twMerge("gap-4", className)}>
    <FilterInputLabel label={title} />
    <FormControlLabel
      id="test"
      control={<Toggle checked={checked} onChange={onChange} />}
      label={label}
    />
  </FormControl>
);
