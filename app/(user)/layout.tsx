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
            <AppSidebar />
            <div className="flex-1 flex flex-col">
               <div className="w-full">
                  <Header>
                     <SidebarTrigger />
                  </Header>
               </div>
               <main className="flex-1">{children}</main>
            </div>
         </div>
      </SidebarProvider>
   );
}
