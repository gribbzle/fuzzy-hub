"use client";

import { useId } from "react";

import { useRadioGroup } from "@portal/contexts";

import { FormControlLabel, Radio, RadioProps } from "@portal/ui/atoms";

type RadioFieldProps = Pick<RadioProps, "size"> & {
  label: string;
  value: string;
  className?: string;
};

export const RadioField = ({
  label,
  size,
  value,
  className,
}: RadioFieldProps) => {
  const id = useId();

  const {
    value: selectedValue,
    onChange,
    size: groupSize,
    name,
  } = useRadioGroup();

  const checked = selectedValue === value;

  return (
    <FormControlLabel
      id={id}
      control={
        <Radio
          id={id}
          size={size ?? groupSize}
          onChange={onChange}
          name={name}
          value={value}
          checked={checked}
        />
      }
      label={label}
      className={className}
    />
  );
};
