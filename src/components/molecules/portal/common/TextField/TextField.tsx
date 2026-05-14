"use client";

import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  TextInput,
  TextInputProps,
} from "@portal/ui/atoms";

type TextFieldProps = Omit<TextInputProps, "name"> & {
  label: string;
  name: string;
};

export const TextField = ({ label, name, ...rest }: TextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <TextInput
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
