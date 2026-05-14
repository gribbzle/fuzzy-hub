"use client";

import type { ReactNode } from "react";

import Image from "next/image";

import { cn } from "@utils";
import type {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";

import { FormField } from "./form-field";

export interface ImagePickerPreviewConfig {
  selectedUrl: string | null;
  currentUrl?: string | null;
  className?: string;
  emptyClassName?: string;
}

export interface ControlledImagePickerFieldProps<
  TFormValues extends FieldValues,
  TName extends FieldPath<TFormValues> = FieldPath<TFormValues>,
> {
  id: string;
  label: string;
  control: Control<TFormValues>;
  name: TName;
  rules?: RegisterOptions<TFormValues, TName>;
  onFilePicked?: (file: File | null) => void;
  preview: ImagePickerPreviewConfig;
  errorMessage?: unknown;
  helperText?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  accept?: string;
  children?: ReactNode;
}

const defaultInputClassName =
  "block w-full rounded-md border border-zinc-300 bg-white px-2 py-1 text-[11px] file:mr-2 file:rounded file:border-0 file:bg-zinc-100 file:px-2 file:py-0.5 file:text-[11px] file:font-medium";

export function ImagePreview({
  selectedUrl,
  currentUrl,
  altBase,
  className,
  emptyClassName,
}: {
  selectedUrl: string | null;
  currentUrl?: string | null;
  altBase: string;
  className: string;
  emptyClassName: string;
}) {
  const displaySrc = selectedUrl || currentUrl;
  if (!displaySrc) {
    return <div className={emptyClassName} />;
  }

  const alt = selectedUrl ? `${altBase} preview` : `${altBase} current`;
  const unoptimized =
    displaySrc.startsWith("blob:") || displaySrc.startsWith("data:");

  return (
    <div className={cn("relative", className)}>
      <Image
        src={displaySrc}
        alt={alt}
        fill
        sizes="100vw"
        className="object-contain p-1"
        unoptimized={unoptimized}
      />
    </div>
  );
}

export function ControlledImagePickerField<
  TFormValues extends FieldValues,
  TName extends FieldPath<TFormValues> = FieldPath<TFormValues>,
>({
  id,
  label,
  control,
  name,
  rules,
  onFilePicked,
  preview,
  errorMessage,
  helperText,
  className,
  labelClassName,
  inputClassName,
  accept = "image/*",
  children,
}: ControlledImagePickerFieldProps<TFormValues, TName>) {
  return (
    <FormField
      id={id}
      label={label}
      helperText={helperText}
      errorMessage={errorMessage}
      className={className}
      labelClassName={labelClassName}
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <input
            id={id}
            type="file"
            accept={accept}
            className={cn(defaultInputClassName, inputClassName)}
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              field.onChange(file);
              onFilePicked?.(file);
            }}
          />
        )}
      />
      <ImagePreview
        selectedUrl={preview.selectedUrl}
        currentUrl={preview.currentUrl}
        altBase={label}
        className={
          preview.className ??
          "h-16 w-full rounded border border-zinc-200 bg-zinc-50 object-contain p-1"
        }
        emptyClassName={
          preview.emptyClassName ??
          "h-16 w-full rounded border border-dashed border-zinc-200 bg-zinc-50"
        }
      />
      {children}
    </FormField>
  );
}
