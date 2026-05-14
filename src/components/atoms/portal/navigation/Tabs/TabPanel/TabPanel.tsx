"use client";

import { PropsWithChildren } from "react";

import { useTabs } from "@portal/contexts";

export interface TabPanelProps extends PropsWithChildren {
  value: string | number;
}

export const TabPanel = ({ value, children }: TabPanelProps) => {
  const { value: currentValue } = useTabs();
  const active = value === currentValue;

  if (!active) {
    return null;
  }

  return children;
};
