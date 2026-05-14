"use client";

import { PropsWithChildren } from "react";

import { TabsProvider, TabsProviderProps } from "@portal/contexts";
import { twMerge } from "@utils";

export interface TabsProps extends TabsProviderProps, PropsWithChildren {
  className?: string;
}

export const Tabs = ({ children, className, ...rest }: TabsProps) => (
  <TabsProvider {...rest}>
    <div className={twMerge("flex items-center gap-3", className)}>
      {children}
    </div>
  </TabsProvider>
);
