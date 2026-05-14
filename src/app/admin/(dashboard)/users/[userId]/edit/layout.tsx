import { ReactNode } from "react";

import type { Metadata } from "next";

import { getAdminSidebarTitleByPathOrFallback } from "../../../_config/adminNavigation";

export const metadata: Metadata = {
  title: getAdminSidebarTitleByPathOrFallback("/admin/users", "Edit user"),
};

const UserEditLayout = ({ children }: { children: ReactNode }) => children;

export default UserEditLayout;
