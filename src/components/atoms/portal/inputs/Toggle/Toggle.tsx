"use client";

import { ChangeEvent, useState } from "react";

import { twMerge } from "@utils";

interface ToggleProps {
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const Toggle = ({
  id,
  checked = false,
  disabled = false,
  onChange,
  className,
}: ToggleProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }

    setIsChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  return (
    <label
      className={twMerge("inline-flex cursor-pointer items-center", className)}
    >
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className="hidden"
      />
      <span
        className={twMerge(
          "relative box-border inline-flex h-5.5 w-10 items-center rounded-[40px] transition-colors duration-200",
          isChecked ? "bg-aqua-green" : "bg-bg-default",
          disabled && "opacity-50",
        )}
      >
        <span
          className={twMerge(
            "transition-left absolute top-0.5 block h-4.5 w-4.5 rounded-[18px] bg-white duration-200",
            isChecked ? "left-5" : "left-0.5",
          )}
        />
      </span>
    </label>
  );
};
