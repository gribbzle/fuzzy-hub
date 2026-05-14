"use client";

import { useEffect, useMemo, useState } from "react";

import type { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";

import { ControlledImagePickerField } from "../../_components/ui/controlled-image-picker-field";
import { FormField } from "../../_components/ui/form-field";
import { Input } from "../../_components/ui/input";
import { Select, type SelectOption } from "../../_components/ui/select";
import { useAdminCatalogsQuery } from "../../_hooks/useAdminCatalogsQuery";
import type { CategoryFormValues } from "../_utils/categoryFormSubmit";

const textareaClassName =
  "w-full min-h-[80px] rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:opacity-50";

interface CategoryCreateFormFieldsProps {
  control: Control<CategoryFormValues>;
  errors: FieldErrors<CategoryFormValues>;
}

export function CategoryCreateFormFields({
  control,
  errors,
}: CategoryCreateFormFieldsProps) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const {
    data: catalogsData,
    isLoading: isCatalogsLoading,
    error: catalogsError,
  } = useAdminCatalogsQuery(1, 100);

  const catalogOptions = useMemo<SelectOption[]>(
    () =>
      (catalogsData?.data.items ?? [])
        .map((catalog) => {
          const catalogPublicId = catalog.public_id?.trim();
          const catalogLabel = catalog.label?.trim();
          if (!catalogPublicId || !catalogLabel) {
            return null;
          }
          return {
            value: catalogPublicId,
            label: catalogLabel,
          };
        })
        .filter((option): option is SelectOption => option != null),
    [catalogsData?.data.items],
  );

  const catalogsHelperText = catalogsError
    ? "Failed to load catalogs. Try reloading the page."
    : "Select catalog from the catalogs list.";

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
        id="category-catalog-id"
        label="Catalog"
        errorMessage={errors.catalog_id?.message}
        labelClassName="text-zinc-900"
        helperText={catalogsHelperText}
      >
        <Controller
          name="catalog_id"
          control={control}
          rules={{
            required: "Catalog is required",
            validate: (value) => {
              const normalized = value.trim();
              if (normalized.length === 0) {
                return "Catalog is invalid";
              }
              return true;
            },
          }}
          render={({ field }) => (
            <Select
              id="category-catalog-id"
              value={field.value}
              options={catalogOptions}
              placeholder={
                isCatalogsLoading ? "Loading catalogs..." : "Select catalog"
              }
              disabled={
                isCatalogsLoading ||
                catalogsError != null ||
                catalogOptions.length === 0
              }
              onValueChange={field.onChange}
            />
          )}
        />
      </FormField>

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

      <ControlledImagePickerField<CategoryFormValues>
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
