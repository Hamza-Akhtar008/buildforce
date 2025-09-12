import { AdminSidebar } from "@/components/common/admin-sidebar";

export default function AdminLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div className="dark min-h-screen bg-background text-foreground">
         <div className="flex">
            <AdminSidebar />
            <main className="flex-1 md:ml-0">
               <div className="container mx-auto p-6 md:pl-8">{children}</div>
            </main>
         </div>
      </div>
   );
}
