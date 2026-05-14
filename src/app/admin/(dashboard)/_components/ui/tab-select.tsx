"use client";

import { cn } from "@utils";

export interface TabSelectOption {
  value: string;
  label: string;
}

export interface TabSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: TabSelectOption[];
  disabled?: boolean;
  /** id of the visible label element above this control */
  ariaLabelledBy?: string;
  /** Use when `ariaLabelledBy` is not set (e.g. no visible label) */
  ariaLabel?: string;
  className?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

export function TabSelect({
  value,
  onValueChange,
  options,
  disabled = false,
  ariaLabelledBy,
  ariaLabel,
  className,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: TabSelectProps) {
  return (
    <div
      role="radiogroup"
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabelledBy ? undefined : ariaLabel}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedBy}
      className={cn(
        "inline-flex flex-wrap gap-2 rounded-lg border border-zinc-200 bg-zinc-50 p-1",
        className,
      )}
    >
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            className={cn(
              "rounded-md border border-transparent px-3 py-1.5 text-sm font-medium transition-colors",
              isSelected
                ? "border-zinc-200 bg-white text-zinc-900"
                : "cursor-pointer text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
              disabled && "cursor-not-allowed opacity-50",
            )}
            onClick={() => onValueChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
