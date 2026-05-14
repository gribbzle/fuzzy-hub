"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

import {
  Dropdown,
  FormControl,
  FormHelperText,
  InputLabel,
  SelectOption,
  SelectOptionItem,
  TextInput,
} from "@portal/ui/atoms";
import { ArrowDown, ArrowUp } from "@portal/ui/icons";

interface SelectFieldProps {
  options: SelectOption[];
  label: string;
  name: string;
  placeholder?: string;
}

export const SelectField = ({
  options,
  label,
  name,
  ...rest
}: SelectFieldProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();

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

  const [valueText, setValueText] = useState<string>("");

  const handleSelect = useCallback(
    (option: SelectOption) => {
      setValueText(option.label);
      setValue(name, option.value);
      handleToggle();
    },
    [handleToggle, name, setValue],
  );

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
          {...rest}
          {...register(name)}
          value={valueText}
          className="truncate"
        />
        <Dropdown open={open}>
          {options.map((option, idx) => (
            <SelectOptionItem
              key={option.value}
              option={option}
              isSelected={option.value === getValues(name)}
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
