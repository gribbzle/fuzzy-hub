import { ReactNode } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dictionary items",
};

const DictionaryItemsLayout = ({ children }: { children: ReactNode }) =>
  children;

export default DictionaryItemsLayout;
