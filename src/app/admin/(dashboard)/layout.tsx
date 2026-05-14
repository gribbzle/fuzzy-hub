import { ReactNode } from "react";

import { AdminNotificationsProvider } from "./_components/AdminNotifications";
import { AdminSidebar } from "./_components/AdminSidebar";

const AdminDashboardLayout = ({ children }: { children: ReactNode }) => (
  <AdminNotificationsProvider>
    <div className="flex h-dvh overflow-hidden bg-zinc-50/80 text-zinc-900">
      <AdminSidebar />
      <main className="min-h-0 flex-1 overflow-auto">{children}</main>
    </div>
  </AdminNotificationsProvider>
);

export default AdminDashboardLayout;
