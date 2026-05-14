import { ReactNode } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit dictionary",
};

const EditDictionaryLayout = ({ children }: { children: ReactNode }) =>
  children;

export default EditDictionaryLayout;
