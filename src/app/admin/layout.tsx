import { ReactNode } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s · Admin · Fuzzy Hub",
    default: "Admin · Fuzzy Hub",
  },
};

const AdminLayout = ({ children }: { children: ReactNode }) => children;

export default AdminLayout;
