import { ReactNode } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

const AdminLoginLayout = ({ children }: { children: ReactNode }) => children;

export default AdminLoginLayout;
