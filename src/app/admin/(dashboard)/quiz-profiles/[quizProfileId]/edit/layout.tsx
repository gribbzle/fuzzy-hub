import { ReactNode } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit quiz profile",
};

const EditQuizProfileLayout = ({ children }: { children: ReactNode }) =>
  children;

export default EditQuizProfileLayout;
