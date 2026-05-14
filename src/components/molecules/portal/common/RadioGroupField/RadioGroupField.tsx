"use client";

import { ChangeEvent, PropsWithChildren, useCallback } from "react";

import { useController, useFormContext } from "react-hook-form";

import { RadioGroup } from "@portal/ui/atoms";

interface RadioGroupFieldProps extends PropsWithChildren {
  name: string;
  className?: string;
  size?: "small" | "large";
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const RadioGroupField = ({
  name,
  children,
  className,
  size,
  defaultValue,
  onChange,
}: RadioGroupFieldProps) => {
  const { control } = useFormContext();

  const {
    field: { value, onChange: onFieldChange },
  } = useController<Record<string, string>>({
    name,
    control,
    defaultValue,
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onFieldChange(e);
      onChange?.(e.target.value);
    },
    [onChange, onFieldChange],
  );

  return (
    <RadioGroup
      name={name}
      value={value}
      onChange={handleChange}
      className={className}
      size={size}
    >
      {children}
    </RadioGroup>
  );
};
