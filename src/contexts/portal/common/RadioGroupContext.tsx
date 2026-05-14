"use client";

import {
  ChangeEvent,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from "react";

/**
 * Type definition for the Radio Group Context.
 */
interface RadioGroupContextType {
  /** Callback function called when the radio button value changes */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Size of the radio buttons in the group */
  size: "small" | "large";
  /** Currently selected value in the group */
  value?: string;
  /** Name attribute for the radio button group, used for form submission and grouping */
  name: string;
}

/**
 * React context for providing radio group state to child components.
 */
export const RadioGroupContext = createContext<RadioGroupContextType | null>(
  null,
);

/**
 * Props for the RadioGroupProvider component.
 */
export interface RadioGroupProviderProps extends PropsWithChildren {
  /** Callback function called when the radio button value changes */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Size of the radio buttons (defaults to "small") */
  size?: "small" | "large";
  /** Currently selected value */
  value?: string;
  /** Name attribute for the group */
  name: string;
}

/**
 * Provider component that wraps radio button group and provides context to children.
 * Uses useMemo to optimize performance by preventing unnecessary re-renders.
 */
export const RadioGroupProvider = ({
  children,
  size = "small",
  onChange,
  value,
  name,
}: RadioGroupProviderProps) => {
  const contextValue = useMemo<RadioGroupContextType>(
    () => ({
      size,
      onChange,
      value,
      name,
    }),
    [size, onChange, value, name],
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      {children}
    </RadioGroupContext.Provider>
  );
};

/**
 * Hook to access the RadioGroup context.
 * Must be used within a RadioGroupProvider.
 *
 * @throws {Error} If used outside of a RadioGroupProvider.
 * @returns {RadioGroupContextType} The current RadioGroup context value.
 */
export const useRadioGroup = (): RadioGroupContextType => {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error("useRadioGroup must be used within a RadioGroupProvider");
  }

  return context;
};
