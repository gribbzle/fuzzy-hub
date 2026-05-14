"use client";

import { FieldValues, FormState } from "react-hook-form";

import { Button, ButtonProps } from "@portal/ui/atoms";

interface SubmitButtonProps<
  TFieldValues extends FieldValues = FieldValues,
> extends ButtonProps {
  formState: FormState<TFieldValues>;
}

export const SubmitButton = <TFieldValues extends FieldValues>({
  children,
  formState,
  ...rest
}: SubmitButtonProps<TFieldValues>) => {
  const { isSubmitting, isValid, submitCount } = formState;

  const disabled = isSubmitting || (submitCount > 0 && !isValid);

  return (
    <Button type="submit" size="medium" disabled={disabled} fullWidth {...rest}>
      {children}
    </Button>
  );
};
