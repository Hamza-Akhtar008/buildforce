"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
   Home,
   FolderOpen,
   UserPlus,
   Plus,
   Bell,
   Download,
   Menu,
   X,
} from "lucide-react";
import { useState } from "react";

const sidebarItems = [
   {
      title: "Dashboard",
      href: "/admin",
      icon: Home,
   },
   {
      title: "Projects",
      href: "/admin/project-management",
      icon: FolderOpen,
   },
   {
      title: "Add User",
      href: "/admin/add-user",
      icon: UserPlus,
   },
   {
      title: "Add Project",
      href: "/admin/add-project",
      icon: Plus,
   },
   {
      title: "Notifications",
      href: "/admin/notifications",
      icon: Bell,
   },
   {
      title: "Export Data",
      href: "/admin/export-data",
      icon: Download,
   },
];

export function AdminSidebar() {
   const pathname = usePathname();
   const [isMobileOpen, setIsMobileOpen] = useState(false);

   return (
      <>
         {/* Mobile Menu Button */}
         <Button
            variant="ghost"
            size="sm"
            className="fixed top-4 left-4 z-50 md:hidden bg-background border shadow-sm"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
         >
            {isMobileOpen ? (
               <X className="h-4 w-4" />
            ) : (
               <Menu className="h-4 w-4" />
            )}
         </Button>

         {/* Overlay for mobile */}
         {isMobileOpen && (
            <div
               className="fixed inset-0 bg-black/50 z-40 md:hidden"
               onClick={() => setIsMobileOpen(false)}
            />
         )}

         {/* Sidebar */}
         <div
            className={cn(
               "fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out",
               isMobileOpen
                  ? "translate-x-0"
                  : "-translate-x-full md:translate-x-0"
            )}
         >
            <div className="flex flex-col h-screen">
               {/* Header */}
               <div className="p-6 border-b border-border">
                  <div className="flex items-center space-x-3">
                     <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Home className="h-5 w-5 text-primary-foreground" />
                     </div>
                     <div>
                        <h2 className="text-lg font-semibold">Build Force</h2>
                        <p className="text-xs text-muted-foreground">
                           Admin Panel
                        </p>
                     </div>
                  </div>
               </div>

               {/* Navigation */}
               <nav className="flex-1 p-4 space-y-2">
                  {sidebarItems.map((item) => {
                     const isActive = pathname === item.href;
                     const Icon = item.icon;

                     return (
                        <Link
                           key={item.href}
                           href={item.href}
                           className="block cursor-pointer"
                           onClick={() => setIsMobileOpen(false)}
                        >
                           <Button
                              variant={isActive ? "default" : "ghost"}
                              className={cn(
                                 "w-full justify-start h-11 cursor-pointer transition-colors",
                                 isActive
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "hover:bg-muted"
                              )}
                           >
                              <Icon className="h-4 w-4 mr-3" />
                              <span className="text-sm font-medium">
                                 {item.title}
                              </span>
                           </Button>
                        </Link>
                     );
                  })}
               </nav>

               {/* Footer */}
               <div className="p-4 border-t border-border">
                  <div className="text-xs text-muted-foreground text-center">
                     Build Force Admin v1.0
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
