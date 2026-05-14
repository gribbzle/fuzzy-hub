"use client";

import { useEffect, useState } from "react";

import type { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";

import { ControlledImagePickerField } from "../../_components/ui/controlled-image-picker-field";
import { FormField } from "../../_components/ui/form-field";
import { Input } from "../../_components/ui/input";
import type { CategoryMetadataFormValues } from "../_utils/categoryFormSubmit";

const textareaClassName =
  "w-full min-h-[80px] rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:opacity-50";

interface CategoryMetadataFormFieldsProps {
  control: Control<CategoryMetadataFormValues>;
  errors: FieldErrors<CategoryMetadataFormValues>;
  currentImageUrl?: string | null;
}

export function CategoryMetadataFormFields({
  control,
  errors,
  currentImageUrl,
}: CategoryMetadataFormFieldsProps) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(
    () => () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    },
    [imagePreviewUrl],
  );

  return (
    <div className="space-y-4">
      <FormField
        id="category-name"
        label="Name"
        errorMessage={errors.name?.message}
        labelClassName="text-zinc-900"
      >
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <Input
              id="category-name"
              type="text"
              autoComplete="off"
              placeholder="e.g. Dogs"
              {...field}
            />
          )}
        />
      </FormField>

      <FormField
        id="category-slug"
        label="Slug"
        errorMessage={errors.slug?.message}
        labelClassName="text-zinc-900"
        helperText="URL-safe identifier (e.g. dogs)."
      >
        <Controller
          name="slug"
          control={control}
          rules={{ required: "Slug is required" }}
          render={({ field }) => (
            <Input
              id="category-slug"
              type="text"
              autoComplete="off"
              placeholder="dogs"
              className="font-mono"
              {...field}
            />
          )}
        />
      </FormField>

      <ControlledImagePickerField<CategoryMetadataFormValues>
        id="category-image"
        label="Image"
        control={control}
        name="image"
        errorMessage={errors.image?.message}
        helperText="Upload one image."
        labelClassName="text-zinc-900"
        onFilePicked={(file) => {
          setImagePreviewUrl((currentUrl) => {
            if (currentUrl) {
              URL.revokeObjectURL(currentUrl);
            }
            return file ? URL.createObjectURL(file) : null;
          });
        }}
        preview={{
          selectedUrl: imagePreviewUrl,
          currentUrl: currentImageUrl,
          className:
            "h-32 w-full rounded border border-zinc-200 bg-zinc-50 object-contain p-1",
          emptyClassName:
            "h-32 w-full rounded border border-dashed border-zinc-200 bg-zinc-50",
        }}
      />

      <FormField
        id="category-description"
        label="Description"
        errorMessage={errors.description?.message}
        labelClassName="text-zinc-900"
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              id="category-description"
              rows={3}
              className={textareaClassName}
              placeholder="Optional description"
              {...field}
            />
          )}
        />
      </FormField>
    </div>
  );
}
