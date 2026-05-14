import type { Metadata } from "next";

import { getAdminSidebarTitleByPathOrFallback } from "../_config/adminNavigation";
import { AdminDictionariesTable } from "./_components/AdminDictionariesTable";

export const metadata: Metadata = {
  title: getAdminSidebarTitleByPathOrFallback(
    "/admin/dictionaries",
    "Dictionaries",
  ),
};

const AdminDictionariesPage = () => <AdminDictionariesTable />;

export default AdminDictionariesPage;
