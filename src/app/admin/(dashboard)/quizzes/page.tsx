import type { Metadata } from "next";

import { AdminQuizzesTable } from "../_components/AdminQuizzesTable";
import { getAdminSidebarTitleByPathOrFallback } from "../_config/adminNavigation";

export const metadata: Metadata = {
  title: getAdminSidebarTitleByPathOrFallback("/admin/quizzes", "Quizzes"),
};

const AdminQuizzesPage = () => <AdminQuizzesTable />;

export default AdminQuizzesPage;
