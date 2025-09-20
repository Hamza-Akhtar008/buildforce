import { AdminSidebar } from "@/components/common/admin-sidebar";
import { AdminHeader } from "@/components/common/AdminHeader";

export default function AdminLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div className="dark min-h-screen bg-background text-foreground">
         <AdminSidebar />
         <main className="md:ml-64">
            <AdminHeader />
            <div className="container mx-auto p-6">{children}</div>
         </main>
      </div>
   );
}
