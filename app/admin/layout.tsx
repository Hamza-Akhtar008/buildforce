import { AdminSidebar } from "@/components/common/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <main className="flex-1">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
