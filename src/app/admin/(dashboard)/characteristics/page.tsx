import type { Metadata } from "next";

import { getAdminSidebarTitleByPathOrFallback } from "../_config/adminNavigation";
import { AdminCharacteristicsTable } from "./_components/AdminCharacteristicsTable";

export const metadata: Metadata = {
  title: getAdminSidebarTitleByPathOrFallback(
    "/admin/characteristics",
    "Characteristics",
  ),
};

const AdminCharacteristicsPage = () => <AdminCharacteristicsTable />;

export default AdminCharacteristicsPage;
