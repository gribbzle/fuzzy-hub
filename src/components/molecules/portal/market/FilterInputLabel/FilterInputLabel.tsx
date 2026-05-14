import { InputLabel } from "@portal/ui/atoms";

interface FilterInputLabelProps {
  label: string;
}

export const FilterInputLabel = ({ label }: FilterInputLabelProps) => (
  <InputLabel className="text-20 text-text-default font-bold">
    {label}
  </InputLabel>
);
