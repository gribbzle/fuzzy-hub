"use client";

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
} from "react";

/**
 * Tabs context type for managing tabs state.
 */
interface TabsContextType {
  /** Callback function called when the active tab changes. */
  onChange: (value: string) => void;
  /** Tabs size. */
  size: "medium" | "large";
  /** Current active tab value. */
  value?: string;
  /** Unique name for the tabs group, used for accessibility (aria) and grouping. */
  name: string;
}

export const TabsContext = createContext<TabsContextType | null>(null);

/**
 * Props for the TabsProvider component.
 */
export interface TabsProviderProps extends PropsWithChildren {
  /** Callback function called when the active tab changes. */
  onChange?: (value: string) => void;
  /** Tabs size (defaults to "medium"). */
  size?: "medium" | "large";
  /** Controlled value of the active tab. */
  value?: string;
  /** Initial value of the active tab for uncontrolled mode. */
  defaultValue?: string;
  /** Unique name for the tabs group. If not provided, a random ID will be generated. */
  name?: string;
}

/**
 * Tabs context provider. Supports both controlled (via `value`)
 * and uncontrolled (via `defaultValue`) modes.
 *
 * @example
 * ```tsx
 * <TabsProvider defaultValue="tab1">
 *   <TabList />
 *   <TabPanel value="tab1">Content 1</TabPanel>
 * </TabsProvider>
 * ```
 */
export const TabsProvider = ({
  children,
  onChange,
  size = "medium",
  value: controlledValue,
  defaultValue,
  name,
}: TabsProviderProps) => {
  const [internalValue, setInternalValue] = useState<string | undefined>(
    defaultValue,
  );

  const id = useId();
  const currentName = name ?? id;

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback(
    (newValue: string) => {
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
      size,
      value: currentValue,
      name: currentName,
    }),
    [handleChange, size, currentValue, currentName],
  );

  return (
    <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
  );
};

/**
 * Custom hook to access tabs context.
 * Must be used within a `TabsProvider` component.
 *
 * @throws {Error} Throws an error if used outside a `TabsProvider`.
 * @returns {TabsContextType} Tabs context object.
 */
export const useTabs = (): TabsContextType => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider");
  }

  return context;
};
