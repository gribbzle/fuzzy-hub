import type { Metadata } from "next";

import { AdminQuizProfilesTable } from "../_components/AdminQuizProfilesTable";
import { getAdminSidebarTitleByPathOrFallback } from "../_config/adminNavigation";

export const metadata: Metadata = {
  title: getAdminSidebarTitleByPathOrFallback(
    "/admin/quiz-profiles",
    "Quiz profiles",
  ),
};

const AdminQuizProfilesPage = () => <AdminQuizProfilesTable />;

export default AdminQuizProfilesPage;
