import type { Metadata } from "next";

import { getAdminSidebarTitleByPathOrFallback } from "../_config/adminNavigation";
import { AdminCategoriesTable } from "./_components/AdminCategoriesTable";

export const metadata: Metadata = {
  title: getAdminSidebarTitleByPathOrFallback(
    "/admin/categories",
    "Categories",
  ),
};

const AdminCategoriesPage = () => <AdminCategoriesTable />;

export default AdminCategoriesPage;
