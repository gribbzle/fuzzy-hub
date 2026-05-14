"use client";

import { DetailedHTMLProps, FormHTMLAttributes } from "react";

import { twMerge } from "@utils";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

type FormProps<T extends FieldValues> = DetailedHTMLProps<
  Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit">,
  HTMLFormElement
> & {
  methods: UseFormReturn<T>;
  onSubmit: (request: T) => Promise<void>;
};

export const Form = <T extends FieldValues>({
  methods,
  children,
  className,
  onSubmit,
  ...rest
}: FormProps<T>) => (
  <FormProvider {...methods}>
    <form
      className={twMerge("flex w-full flex-col gap-4", className)}
      onSubmit={methods.handleSubmit(onSubmit)}
      {...rest}
    >
      {children}
    </form>
  </FormProvider>
);
