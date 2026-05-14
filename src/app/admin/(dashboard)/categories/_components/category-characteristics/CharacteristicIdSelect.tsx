"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useAdminCharacteristicsQuery } from "@/app/admin/(dashboard)/_hooks/useAdminCharacteristicsQuery";
import {
  formatAdminCharacteristicGroupLabel,
  formatAdminCharacteristicTypeLabel,
} from "@/app/admin/(dashboard)/_models";
import { cn } from "@utils";

import { Input } from "../../../_components/ui/input";

interface CharacteristicIdSelectProps {
  id: string;
  value: string;
  disabled?: boolean;
  onValueChange: (value: string) => void;
}

export function CharacteristicIdSelect({
  id,
  value,
  disabled = false,
  onValueChange,
}: CharacteristicIdSelectProps) {
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

  const { data, isLoading, error } = useAdminCharacteristicsQuery(1, 20, {
    search: debouncedSearchTerm,
  });
  const options = useMemo(
    () =>
      (data?.data.items ?? []).map((item) => ({
        value: item.public_id,
        label: item.name,
        meta: `${formatAdminCharacteristicTypeLabel(item.type)} - ${formatAdminCharacteristicGroupLabel(item.group)}`,
      })),
    [data?.data.items],
  );

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value],
  );

  return (
    <div className="relative" ref={containerRef}>
      <button
        id={id}
        type="button"
        disabled={disabled}
        className="flex h-10 w-full items-center justify-between rounded-md border border-zinc-300 bg-white px-3 py-2 text-left text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
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
            (value !== ""
              ? "Selected characteristic"
              : "Select characteristic")}
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
              placeholder="Type to search characteristics"
              autoComplete="off"
              disabled={disabled}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <ul role="listbox" className="max-h-64 overflow-auto py-1">
            {options.map((option) => {
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
                Loading characteristics...
              </li>
            ) : null}
            {!isLoading && options.length === 0 ? (
              <li className="px-3 py-2 text-sm text-zinc-500">
                No characteristics found
              </li>
            ) : null}
            {error ? (
              <li className="px-3 py-2 text-sm text-red-600">
                Failed to load characteristics. Try again.
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
