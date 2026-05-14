import { ReactNode } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New widget",
};

const NewWidgetLayout = ({ children }: { children: ReactNode }) => children;

export default NewWidgetLayout;
