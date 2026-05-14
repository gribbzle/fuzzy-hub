"use client";

import type {
  Control,
  FieldPath,
  RegisterOptions,
  UseFormRegisterReturn,
} from "react-hook-form";

import { Button } from "../../_components/ui/button";
import {
  ControlledImagePickerField,
  ImagePreview,
} from "../../_components/ui/controlled-image-picker-field";
import { FormField } from "../../_components/ui/form-field";
import type { WidgetFormValues } from "../_utils/widgetFormTypes";

const textareaClassName =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200";

export const fileInputClassName =
  "block w-full rounded-md border border-zinc-300 bg-white px-2 py-1 text-[11px] file:mr-2 file:rounded file:border-0 file:bg-zinc-100 file:px-2 file:py-0.5 file:text-[11px] file:font-medium";

interface FieldErrorMessageProps {
  message: unknown;
}

export const FieldErrorMessage = ({ message }: FieldErrorMessageProps) => {
  if (!message) {
    return null;
  }

  return <p className="text-xs text-red-600">{String(message)}</p>;
};

interface LabeledTextareaProps {
  id: string;
  label: string;
  rows?: number;
  inputProps: UseFormRegisterReturn;
  errorMessage?: unknown;
}

export const LabeledTextarea = ({
  id,
  label,
  rows = 3,
  inputProps,
  errorMessage,
}: LabeledTextareaProps) => {
  return (
    <FormField id={id} label={label} errorMessage={errorMessage}>
      <textarea
        id={id}
        rows={rows}
        className={textareaClassName}
        {...inputProps}
      />
    </FormField>
  );
};

export const FilePreview = ImagePreview;

interface ControlledImagePreviewConfig {
  selectedUrl: string | null;
  currentUrl?: string | null;
  className?: string;
  emptyClassName?: string;
}

interface ControlledImageFileFieldProps<
  TName extends FieldPath<WidgetFormValues> = FieldPath<WidgetFormValues>,
> {
  id: string;
  label: string;
  control: Control<WidgetFormValues>;
  name: TName;
  /** Narrowed at call sites to match the image field; widened here for dynamic paths. */
  rules?: RegisterOptions<WidgetFormValues, TName>;
  onFilePicked?: (file: File | null) => void;
  preview: ControlledImagePreviewConfig;
  errorMessage?: unknown;
}

export const ControlledImageFileField = <
  TName extends FieldPath<WidgetFormValues>,
>({
  id,
  label,
  control,
  name,
  rules,
  onFilePicked,
  preview,
  errorMessage,
}: ControlledImageFileFieldProps<TName>) => {
  return (
    <ControlledImagePickerField<WidgetFormValues, TName>
      id={id}
      label={label}
      control={control}
      name={name}
      rules={rules}
      onFilePicked={onFilePicked}
      preview={preview}
      errorMessage={errorMessage}
      labelClassName="text-xs font-medium text-zinc-700"
      className="space-y-1.5"
      inputClassName={fileInputClassName}
    />
  );
};

interface UploadButtonProps {
  inputId: string;
  label: string;
}

export const UploadButton = ({ inputId, label }: UploadButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="h-8 w-8"
      aria-label={`${label} upload`}
      onClick={() => {
        const input = document.getElementById(
          inputId,
        ) as HTMLInputElement | null;
        input?.click();
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          d="M12 16V8m0 0-3 3m3-3 3 3M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  );
};
