import type { Metadata } from "next";

import { AdminWidgetsTable } from "./_components/AdminWidgetsTable";
import { getAdminSidebarTitleByPathOrFallback } from "./_config/adminNavigation";

export const metadata: Metadata = {
  title: getAdminSidebarTitleByPathOrFallback("/admin", "Widgets"),
};

const AdminWidgetsPage = () => <AdminWidgetsTable />;

export default AdminWidgetsPage;
