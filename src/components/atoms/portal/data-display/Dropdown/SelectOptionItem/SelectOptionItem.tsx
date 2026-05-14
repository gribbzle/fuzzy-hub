import { ReactNode } from "react";

import { twMerge } from "@utils";

import { Check } from "@portal/ui/icons";

export type SelectOption = {
  value: string;
  label: string;
  icon?: ReactNode;
};

type OptionItemProps = {
  option: SelectOption;
  isSelected: boolean;
  isStriped: boolean;
  onSelect: (option: SelectOption) => void;
};

export const SelectOptionItem = ({
  option,
  isSelected,
  isStriped,
  onSelect,
}: OptionItemProps) => (
  <div
    role="option"
    aria-selected={isSelected}
    onClick={() => onSelect(option)}
    className={twMerge(
      "flex cursor-pointer items-center justify-between px-4 py-4.5",
      isStriped ? "bg-white" : "bg-bg-light",
      "hover:bg-[#EDFBFA]",
      isSelected && "bg-[#EDFBFA]",
    )}
  >
    <div className="flex min-w-0 items-center gap-2">
      {option.icon && (
        <div className="h-6 w-6 shrink-0 overflow-hidden">{option.icon}</div>
      )}
      <span className="text-16 text-text-default truncate font-semibold">
        {option.label}
      </span>
    </div>
    <div className="flex shrink-0 items-center justify-center">
      {isSelected && (
        <Check width={20} height={20} className="text-aqua-green" />
      )}
    </div>
  </div>
);
