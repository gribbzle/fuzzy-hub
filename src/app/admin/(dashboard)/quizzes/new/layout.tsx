import { ReactNode } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New quiz",
};

const NewQuizLayout = ({ children }: { children: ReactNode }) => children;

export default NewQuizLayout;
