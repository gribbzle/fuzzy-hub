import { ReactNode } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New quiz profile",
};

const NewQuizProfileLayout = ({ children }: { children: ReactNode }) =>
  children;

export default NewQuizProfileLayout;
