import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  id?: string;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  minimal?: boolean;
  className?: string;
  onValueChange: (value: string) => void;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      id,
      value,
      options,
      placeholder = "Select an option",
      disabled,
      minimal = false,
      className,
      onValueChange,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const selectedOption = useMemo(
      () => options.find((option) => option.value === value) ?? null,
      [options, value],
    );

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

    return (
      <div className={cn("relative", className)} ref={containerRef}>
        <button
          id={id}
          ref={ref}
          type="button"
          disabled={disabled}
          className={cn(
            minimal
              ? "flex h-8 w-full items-center justify-between rounded-md border border-zinc-300 bg-white px-2 text-left text-xs text-zinc-700 outline-none transition-colors"
              : "flex h-10 w-full items-center justify-between rounded-md border border-zinc-300 bg-white px-3 py-2 text-left text-sm text-zinc-900 outline-none transition-colors",
            minimal
              ? "hover:border-zinc-300 hover:bg-zinc-50/40"
              : "hover:border-zinc-300 hover:bg-zinc-50/40",
            minimal
              ? "focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
              : "focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span
            className={cn(
              "truncate",
              selectedOption ? "text-zinc-900" : "text-zinc-500",
            )}
          >
            {selectedOption?.label ?? placeholder}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              minimal
                ? "ml-2 flex h-4 w-4 items-center justify-center text-zinc-500 transition-transform"
                : "ml-2 flex h-4 w-4 items-center justify-center text-zinc-500 transition-transform",
              isOpen ? "rotate-180" : "",
            )}
          >
            <svg
              viewBox="0 0 16 16"
              className={cn(
                minimal ? "h-3.5 w-3.5 fill-current" : "h-4 w-4 fill-current",
              )}
              focusable="false"
              aria-hidden="true"
            >
              <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06z" />
            </svg>
          </span>
        </button>

        {isOpen ? (
          <div
            className={cn(
              "absolute z-50 mt-1 w-full overflow-hidden rounded-md border border-zinc-200 bg-white",
            )}
          >
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
                        minimal
                          ? "flex w-full items-center justify-between px-2 py-1.5 text-left text-xs transition-colors"
                          : "flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors",
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
                      {!minimal && isSelected ? (
                        <span className="text-xs text-zinc-500">Selected</span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
