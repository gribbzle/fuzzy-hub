"use client";

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

/**
 * Type definition for the FilterCardGroup context value.
 */
export interface FilterCardGroupContextType {
  /**
   * Callback fired when the selected value changes.
   * @param value The new selected value.
   */
  onChange?: (value: string | number) => void;
  /**
   * The current selected value.
   */
  value?: string | number;
}

/**
 * Context for managing a group of filter cards.
 * Provides the current selected value and an onChange handler.
 */
export const FilterCardGroupContext =
  createContext<FilterCardGroupContextType | null>(null);

/**
 * Props for the FilterCardGroupProvider component.
 */
interface FilterCardGroupProviderProps extends PropsWithChildren {
  /**
   * Callback fired when the value changes.
   */
  onChange?: (value: string | number) => void;
  /**
   * The current selected value (controlled).
   */
  value?: string | number;
  /**
   * The initial value (uncontrolled).
   */
  defaultValue?: string | number;
}

/**
 * Provider component for the FilterCardGroupContext.
 * Supports both controlled and uncontrolled value management.
 *
 * @param props - Component props including children, value, defaultValue, and onChange.
 */
export const FilterCardGroupProvider = ({
  value: controlledValue,
  defaultValue,
  onChange,
  children,
}: FilterCardGroupProviderProps) => {
  const [internalValue, setInternalValue] = useState<
    string | number | undefined
  >(defaultValue);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback(
    (newValue: string | number) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  const contextValue = useMemo(
    () => ({
      onChange: handleChange,
      value: currentValue,
    }),
    [currentValue, handleChange],
  );

  return (
    <FilterCardGroupContext.Provider value={contextValue}>
      {children}
    </FilterCardGroupContext.Provider>
  );
};

/**
 * Custom hook to use the FilterCardGroup context.
 * Throws an error if used outside of a FilterCardGroupProvider.
 *
 * @returns The context value containing the current value and onChange handler.
 * @throws {Error} If used outside of FilterCardGroupProvider.
 */
export const useFilterCardGroup = (): FilterCardGroupContextType => {
  const context = useContext(FilterCardGroupContext);

  if (!context) {
    throw new Error(
      "useFilterCardGroup must be used within a FilterCardGroupProvider",
    );
  }

  return context;
};
