import { FormControl } from "@portal/ui/atoms";

import { FilterInputLabel } from "@portal/market/ui/molecules";

export type LocationFilterProps = {
  title: string;
};

export const LocationFilter = ({ title }: LocationFilterProps) => (
  <FormControl className="gap-3">
    <FilterInputLabel label={title} />
    {/*<Select*/}
    {/*  placeholder={placeholder}*/}
    {/*  options={options}*/}
    {/*  // leftIcon={<LocationTick className="text-primary" />}*/}
    {/*/>*/}
  </FormControl>
);
