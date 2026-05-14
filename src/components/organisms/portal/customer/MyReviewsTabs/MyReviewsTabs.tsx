"use client";

import { useCallback, useState } from "react";

import { TabsProvider } from "@portal/contexts";

import { Tab, TabProps, Tabs, TabsProps } from "@portal/ui/atoms";

interface MyReviewsTabsProps extends TabsProps {
  /** Array of tab definitions coming from the parent. */
  tabs: TabProps[];
}

/**
 * Renders a tab list.
 */
export const MyReviewsTabs = ({
  tabs,
  children,
  onChange,
  defaultValue = "",
  ...rest
}: MyReviewsTabsProps) => {
  const [value, setValue] = useState<string>(defaultValue);

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onChange?.(newValue);
    },
    [onChange],
  );

  return (
    <>
      <Tabs
        size="large"
        defaultValue={defaultValue}
        onChange={handleChange}
        {...rest}
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} {...tab} />
        ))}
      </Tabs>
      <TabsProvider value={value}>{children}</TabsProvider>
    </>
  );
};
