import { ReactNode } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit quiz",
};

const EditQuizLayout = ({ children }: { children: ReactNode }) => children;

export default EditQuizLayout;
