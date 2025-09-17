import { cookies } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/app-sidebar";
import { Header } from "@/components/common/Header";

export default async function DashboardLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const cookieStore = await cookies();
   const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

   return (
   <SidebarProvider defaultOpen={true}>
  <div className="flex min-h-screen w-full">
    {/* Sidebar on the left */}
    <AppSidebar />

    {/* Main content on the right */}
    <div className="flex-1 flex flex-col">
      <Header>
        <SidebarTrigger />
      </Header>

      <main className="md:ml-64">
        {children}
      </main>
    </div>
  </div>
</SidebarProvider>

   );
}
