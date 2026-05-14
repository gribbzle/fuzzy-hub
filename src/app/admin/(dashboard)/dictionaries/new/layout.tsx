import { ReactNode } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New dictionary",
};

const NewDictionaryLayout = ({ children }: { children: ReactNode }) => children;

export default NewDictionaryLayout;
