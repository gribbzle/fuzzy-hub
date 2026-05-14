"use client";

import type { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";

import { FormField } from "../../_components/ui/form-field";
import { Input } from "../../_components/ui/input";
import type { DictionaryFormValues } from "../_utils/dictionaryFormSubmit";

const textareaClassName =
  "w-full min-h-[80px] rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:opacity-50";

interface DictionaryMetadataFormFieldsProps {
  control: Control<DictionaryFormValues>;
  errors: FieldErrors<DictionaryFormValues>;
}

export function DictionaryMetadataFormFields({
  control,
  errors,
}: DictionaryMetadataFormFieldsProps) {
  return (
    <div className="space-y-4">
      <FormField
        id="dictionary-name"
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
              id="dictionary-name"
              type="text"
              autoComplete="off"
              placeholder="Dictionary name"
              {...field}
            />
          )}
        />
      </FormField>

      <FormField
        id="dictionary-slug"
        label="Slug"
        errorMessage={errors.slug?.message}
        labelClassName="text-zinc-900"
        helperText="URL-safe identifier (e.g. pet-breeds)."
      >
        <Controller
          name="slug"
          control={control}
          rules={{ required: "Slug is required" }}
          render={({ field }) => (
            <Input
              id="dictionary-slug"
              type="text"
              autoComplete="off"
              placeholder="pet-breeds"
              className="font-mono"
              {...field}
            />
          )}
        />
      </FormField>

      <FormField
        id="dictionary-description"
        label="Description"
        errorMessage={errors.description?.message}
        labelClassName="text-zinc-900"
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              id="dictionary-description"
              rows={3}
              className={textareaClassName}
              placeholder="What this dictionary is used for"
              {...field}
            />
          )}
        />
      </FormField>
    </div>
  );
}
