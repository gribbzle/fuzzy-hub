"use client";

import { useMemo } from "react";

import { useTabs } from "@portal/contexts";
import { twMerge } from "@utils";

type TabSize = "small" | "medium" | "large";

export interface TabProps {
  size?: TabSize;
  className?: string;
  value: string;
  label: string;
}

const sizeClasses: Record<TabSize, string> = {
  large: "tab-large",
  medium: "tab-medium",
  small: "tab-small",
};

export const Tab = ({
  size: currentSize,
  label,
  className,
  value,
}: TabProps) => {
  const { size: parentSize, onChange, name, value: parentValue } = useTabs();

  const size = useMemo(
    () => currentSize ?? parentSize,
    [parentSize, currentSize],
  );

  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        className="peer hidden"
        name={name}
        value={value}
        onChange={() => onChange(value)}
        checked={value === parentValue}
      />
      <span
        className={twMerge(
          `tab ${sizeClasses[size]}`,
          "hover:peer-not-checked:border-aqua-green hover:peer-not-checked:text-aqua-green",
          "peer-checked:bg-aqua-green peer-checked:border-aqua-green peer-checked:text-white",
          className,
        )}
      >
        {label}
      </span>
    </label>
  );
};
