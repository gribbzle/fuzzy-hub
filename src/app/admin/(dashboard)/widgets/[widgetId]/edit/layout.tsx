import { ReactNode } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit widget",
};

const EditWidgetLayout = ({ children }: { children: ReactNode }) => children;

export default EditWidgetLayout;
