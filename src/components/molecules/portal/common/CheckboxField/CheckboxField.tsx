"use client";

import { ReactNode, useId } from "react";

import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@portal/ui/atoms";

type CheckboxFieldProps = Pick<CheckboxProps, "size"> & {
  name: string;
  label: ReactNode;
  className?: string;
};

export const CheckboxField = ({
  name,
  label,
  size = "small",
  className,
}: CheckboxFieldProps) => {
  const id = useId();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl>
      <FormControlLabel
        id={id}
        control={<Checkbox id={id} size={size} {...register(name)} />}
        label={label}
        className={className}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <FormHelperText error>{message}</FormHelperText>
        )}
      />
    </FormControl>
  );
};
