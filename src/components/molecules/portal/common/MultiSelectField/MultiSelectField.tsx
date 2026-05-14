"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

import {
  Dropdown,
  FormControl,
  FormHelperText,
  InputLabel,
  MultiSelectOptionItem,
  SelectOption,
  TextInput,
} from "@portal/ui/atoms";
import { ArrowDown, ArrowUp } from "@portal/ui/icons";

interface MultiSelectFieldProps {
  options?: SelectOption[];
  label: string;
  name: string;
  placeholder?: string;
  isLoading?: boolean;
}

export const MultiSelectField = ({
  options = [],
  label,
  name,
  placeholder,
  isLoading,
  ...rest
}: MultiSelectFieldProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const watchedValue = watch(name);

  const selectedValues = useMemo(
    () => (Array.isArray(watchedValue) ? watchedValue : []),
    [watchedValue],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleClickOutside = (e: globalThis.MouseEvent) => {
      const target = e.target as Node | null;

      if (containerRef.current?.contains(target)) {
        return;
      }

      setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [name, open]);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (option: SelectOption) => {
      const isSelected = selectedValues.includes(option.value);

      const newValues = isSelected
        ? selectedValues.filter((v: string) => v !== option.value)
        : [...selectedValues, option.value];

      setValue(name, newValues, { shouldValidate: true });
    },
    [name, selectedValues, setValue],
  );

  const valueText = useMemo(() => {
    if (isLoading) {
      return "Loading...";
    }

    return options
      .filter((option) => selectedValues.includes(option.value))
      .map((option) => option.label)
      .join(", ");
  }, [options, selectedValues, isLoading]);

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <div className="relative" ref={containerRef}>
        <TextInput
          onClick={handleToggle}
          readOnly
          error={!!errors[name]}
          EndIcon={open ? ArrowUp : ArrowDown}
          onEndIconClick={handleToggle}
          disabled={isLoading}
          {...rest}
          {...register(name)}
          value={valueText}
          placeholder={placeholder}
          className="truncate"
        />
        <Dropdown open={open} className="max-h-81.5">
          {options.map((option, idx) => (
            <MultiSelectOptionItem
              key={option.value}
              option={option}
              isSelected={selectedValues.includes(option.value)}
              isStriped={idx % 2 === 0}
              onSelect={handleSelect}
            />
          ))}
        </Dropdown>
      </div>
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
