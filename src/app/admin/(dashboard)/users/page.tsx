import type { Metadata } from "next";

import { getAdminSidebarTitleByPathOrFallback } from "../_config/adminNavigation";
import { AdminUsersTable } from "./_components/AdminUsersTable";

export const metadata: Metadata = {
  title: getAdminSidebarTitleByPathOrFallback("/admin/users", "Users"),
};

const AdminUsersPage = () => <AdminUsersTable />;

export default AdminUsersPage;
