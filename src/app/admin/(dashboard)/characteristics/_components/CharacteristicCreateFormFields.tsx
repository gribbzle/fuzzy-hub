"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useAdminDictionariesQuery } from "@/app/admin/(dashboard)/_hooks/useAdminDictionariesQuery";
import {
  ADMIN_CHARACTERISTIC_GROUP_LABELS,
  ADMIN_CHARACTERISTIC_TYPE_LABELS,
  type AdminDictionary,
} from "@/app/admin/(dashboard)/_models";
import { cn } from "@utils";
import type { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";

import { FormField } from "../../_components/ui/form-field";
import { Input } from "../../_components/ui/input";
import { Select, SelectOption } from "../../_components/ui/select";
import {
  CHARACTERISTIC_CREATE_GROUPS,
  CHARACTERISTIC_CREATE_TYPES,
  type CharacteristicFormValues,
} from "../_utils/characteristicFormTypes";

const textareaClassName =
  "w-full min-h-[80px] rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:opacity-50";

const typeOptions: SelectOption[] = CHARACTERISTIC_CREATE_TYPES.map((t) => ({
  value: t,
  label: ADMIN_CHARACTERISTIC_TYPE_LABELS[t],
}));

const groupOptions: SelectOption[] = CHARACTERISTIC_CREATE_GROUPS.map((g) => ({
  value: g,
  label: ADMIN_CHARACTERISTIC_GROUP_LABELS[g],
}));

interface DictionaryIdSelectProps {
  id: string;
  value: string;
  onValueChange: (value: string) => void;
}

function getDictionaryOptionValue(dictionary: AdminDictionary): string {
  const dictionaryWithOptionalIds = dictionary as {
    id?: unknown;
    dictionary_id?: unknown;
    internal_id?: unknown;
  };
  const candidates = [
    dictionaryWithOptionalIds.id,
    dictionaryWithOptionalIds.dictionary_id,
    dictionaryWithOptionalIds.internal_id,
  ];

  for (const candidate of candidates) {
    if (
      typeof candidate === "number" &&
      Number.isFinite(candidate) &&
      candidate > 0
    ) {
      return String(candidate);
    }
    if (typeof candidate === "string") {
      const parsedId = Number.parseInt(candidate.trim(), 10);
      if (Number.isFinite(parsedId) && parsedId > 0) {
        return String(parsedId);
      }
    }
  }

  // Fallback keeps options visible even when list payload omits numeric id.
  return dictionary.public_id;
}

function DictionaryIdSelect({
  id,
  value,
  onValueChange,
}: DictionaryIdSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 350);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current) {
        return;
      }
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const { data, isLoading, error } = useAdminDictionariesQuery(1, 20, {
    search: debouncedSearchTerm,
  });

  const dictionaryOptions = useMemo(() => {
    return (data?.data.items ?? []).map((dictionary) => ({
      value: getDictionaryOptionValue(dictionary),
      label: dictionary.name,
      meta: dictionary.slug,
    }));
  }, [data?.data.items]);

  const selectedOption = useMemo(
    () => dictionaryOptions.find((option) => option.value === value) ?? null,
    [dictionaryOptions, value],
  );

  return (
    <div className="relative" ref={containerRef}>
      <button
        id={id}
        type="button"
        className="flex h-10 w-full items-center justify-between rounded-md border border-zinc-300 bg-white px-3 py-2 text-left text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span
          className={cn(
            "truncate",
            selectedOption || value !== "" ? "text-zinc-900" : "text-zinc-500",
          )}
        >
          {selectedOption?.label ??
            (value !== "" ? `Dictionary #${value}` : "Select dictionary")}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "ml-2 flex h-4 w-4 items-center justify-center text-zinc-500 transition-transform",
            isOpen ? "rotate-180" : "",
          )}
        >
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4 fill-current"
            focusable="false"
            aria-hidden="true"
          >
            <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06z" />
          </svg>
        </span>
      </button>

      {isOpen ? (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border border-zinc-200 bg-white">
          <div className="border-b border-zinc-100 p-2">
            <Input
              id={`${id}-search`}
              type="text"
              value={searchTerm}
              placeholder="Type to search dictionaries"
              autoComplete="off"
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <ul role="listbox" className="max-h-64 overflow-auto py-1">
            <li>
              <button
                type="button"
                role="option"
                aria-selected={value === ""}
                className={cn(
                  "flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors",
                  value === ""
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-700 hover:bg-zinc-50",
                )}
                onClick={() => {
                  onValueChange("");
                  setIsOpen(false);
                }}
              >
                <span className="truncate">No dictionary</span>
              </button>
            </li>

            {dictionaryOptions.map((option) => {
              const isSelected = option.value === value;
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={cn(
                      "flex w-full flex-col items-start px-3 py-2 text-left text-sm transition-colors",
                      isSelected
                        ? "bg-zinc-100 text-zinc-900"
                        : "text-zinc-700 hover:bg-zinc-50",
                    )}
                    onClick={() => {
                      onValueChange(option.value);
                      setIsOpen(false);
                    }}
                  >
                    <span className="truncate">{option.label}</span>
                    <span className="truncate text-xs text-zinc-500">
                      {option.meta}
                    </span>
                  </button>
                </li>
              );
            })}

            {isLoading ? (
              <li className="px-3 py-2 text-sm text-zinc-500">
                Loading dictionaries...
              </li>
            ) : null}
            {!isLoading && dictionaryOptions.length === 0 ? (
              <li className="px-3 py-2 text-sm text-zinc-500">
                No dictionaries found
              </li>
            ) : null}
            {error ? (
              <li className="px-3 py-2 text-sm text-red-600">
                Failed to load dictionaries. Try again.
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

interface CharacteristicCreateFormFieldsProps {
  control: Control<CharacteristicFormValues>;
  errors: FieldErrors<CharacteristicFormValues>;
}

export function CharacteristicCreateFormFields({
  control,
  errors,
}: CharacteristicCreateFormFieldsProps) {
  return (
    <div className="space-y-4">
      <FormField
        id="characteristic-name"
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
              id="characteristic-name"
              type="text"
              autoComplete="off"
              placeholder="e.g. Age"
              {...field}
            />
          )}
        />
      </FormField>

      <FormField
        id="characteristic-slug"
        label="Slug"
        errorMessage={errors.slug?.message}
        labelClassName="text-zinc-900"
        helperText="URL-safe identifier (e.g. age)."
      >
        <Controller
          name="slug"
          control={control}
          rules={{ required: "Slug is required" }}
          render={({ field }) => (
            <Input
              id="characteristic-slug"
              type="text"
              autoComplete="off"
              placeholder="age"
              className="font-mono"
              {...field}
            />
          )}
        />
      </FormField>

      <FormField
        id="characteristic-type"
        label="Type"
        errorMessage={errors.type?.message}
        labelClassName="text-zinc-900"
      >
        <Controller
          name="type"
          control={control}
          rules={{ required: "Type is required" }}
          render={({ field }) => (
            <Select
              id="characteristic-type"
              value={field.value}
              options={typeOptions}
              placeholder="Select type"
              onValueChange={field.onChange}
            />
          )}
        />
      </FormField>

      <FormField
        id="characteristic-group"
        label="Group"
        errorMessage={errors.group?.message}
        labelClassName="text-zinc-900"
      >
        <Controller
          name="group"
          control={control}
          rules={{ required: "Group is required" }}
          render={({ field }) => (
            <Select
              id="characteristic-group"
              value={field.value}
              options={groupOptions}
              placeholder="Select group"
              onValueChange={field.onChange}
            />
          )}
        />
      </FormField>

      <FormField
        id="characteristic-description"
        label="Description"
        errorMessage={errors.description?.message}
        labelClassName="text-zinc-900"
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              id="characteristic-description"
              rows={3}
              className={textareaClassName}
              placeholder="Optional description"
              {...field}
            />
          )}
        />
      </FormField>

      <FormField
        id="characteristic-dictionary-id"
        label="Dictionary ID"
        errorMessage={errors.dictionary_id?.message}
        labelClassName="text-zinc-900"
        helperText="Optional. Type to search dictionaries and select one."
      >
        <Controller
          name="dictionary_id"
          control={control}
          render={({ field }) => (
            <DictionaryIdSelect
              id="characteristic-dictionary-id"
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
      </FormField>

      <FormField
        id="characteristic-unit"
        label="Unit"
        errorMessage={errors.unit?.message}
        labelClassName="text-zinc-900"
      >
        <Controller
          name="unit"
          control={control}
          render={({ field }) => (
            <Input
              id="characteristic-unit"
              type="text"
              autoComplete="off"
              placeholder="e.g. years"
              {...field}
            />
          )}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="characteristic-min"
          label="Min"
          errorMessage={errors.min?.message}
          labelClassName="text-zinc-900"
        >
          <Controller
            name="min"
            control={control}
            render={({ field }) => (
              <Input
                id="characteristic-min"
                type="number"
                inputMode="numeric"
                placeholder="Optional"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
        </FormField>

        <FormField
          id="characteristic-max"
          label="Max"
          errorMessage={errors.max?.message}
          labelClassName="text-zinc-900"
        >
          <Controller
            name="max"
            control={control}
            render={({ field }) => (
              <Input
                id="characteristic-max"
                type="number"
                inputMode="numeric"
                placeholder="Optional"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
        </FormField>
      </div>

      <FormField
        id="characteristic-max-length"
        label="Max length"
        errorMessage={errors.max_length?.message}
        labelClassName="text-zinc-900"
      >
        <Controller
          name="max_length"
          control={control}
          render={({ field }) => (
            <Input
              id="characteristic-max-length"
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              placeholder="Optional"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
      </FormField>
    </div>
  );
}
