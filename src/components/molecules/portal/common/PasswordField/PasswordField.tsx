"use client";

import { useState } from "react";

import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  TextInput,
  TextInputProps,
} from "@portal/ui/atoms";
import { Eye, EyeSlash } from "@portal/ui/icons";

type PasswordFieldProps = Omit<TextInputProps, "name"> & {
  label: string;
  name: string;
};

export const PasswordField = ({ label, name, ...rest }: PasswordFieldProps) => {
  const [show, setShow] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <TextInput
        type={show ? "text" : "password"}
        error={!!errors[name]}
        {...rest}
        {...register(name)}
        EndIcon={show ? Eye : EyeSlash}
        onEndIconClick={() => setShow((s) => !s)}
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
