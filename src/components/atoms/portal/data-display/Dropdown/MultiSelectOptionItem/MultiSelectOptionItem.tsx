import { twMerge } from "@utils";

import { Checkbox } from "@portal/ui/atoms";

import { SelectOption } from "../SelectOptionItem";

type MultiSelectOptionItemProps = {
  option: SelectOption;
  isSelected: boolean;
  isStriped: boolean;
  onSelect: (option: SelectOption) => void;
};

export const MultiSelectOptionItem = ({
  option,
  isSelected,
  isStriped,
  onSelect,
}: MultiSelectOptionItemProps) => (
  <div
    role="option"
    aria-selected={isSelected}
    onClick={() => onSelect(option)}
    className={twMerge(
      "flex cursor-pointer items-center gap-2 px-4 py-4.5",
      isStriped ? "bg-white" : "bg-bg-light",
      "hover:bg-[#EDFBFA]",
      isSelected && "bg-[#EDFBFA]",
    )}
  >
    <Checkbox checked={isSelected} readOnly className="shrink-0" />
    <span className="text-16 text-text-default min-w-0 truncate font-medium">
      {option.label}
    </span>
  </div>
);
