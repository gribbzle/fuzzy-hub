"use client";

import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  TextArea,
  TextAreaProps,
} from "@portal/ui/atoms";

type TextAreaFieldProps = Omit<TextAreaProps, "name"> & {
  label: string;
  name: string;
};

export const TextAreaField = ({ label, name, ...rest }: TextAreaFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <TextArea
        aria-invalid={errors[name] ? "true" : "false"}
        error={!!errors[name]}
        {...rest}
        {...register(name)}
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
