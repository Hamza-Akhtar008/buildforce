"use client";
import { ReactNode } from "react";
import { CheckCircle, User, LogOut, Settings, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function Unverified_header({ children }: { children?: ReactNode }) {
   const router = useRouter();
const {logout } = useAuth();
   const handleLogout = () => {
      // Clear any stored user data/tokens here if needed
      logout();
      router.push("/auth/signin");
   };

   const handleSettings = () => {
      router.push("/admin/settings");
   };

   return (
      <header className="flex items-center justify-between bg-background z-50 px-6 py-4 w-full border-b border-border sticky top-0 shadow-sm h-20">
         <div className="flex items-center gap-6">{children}</div>

         <div className="flex items-center gap-4">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Avatar className="h-10 w-10 cursor-pointer  transition-all">
                     <User className="h-6 w-6 text-primary" />
                  </Avatar>
               </DropdownMenuTrigger>
               <DropdownMenuContent
                  className="w-64 mr-4 mt-2"
                  align="end"
                  forceMount
               >
                  <DropdownMenuLabel className="font-normal p-4 pb-2">
                     <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <User className="h-6 w-6 text-primary" />
                        </Avatar>
                        <div className="flex flex-col space-y-1">
                           <p className="text-sm font-semibold leading-none text-foreground">
                              Labour 
                           </p>
                         
                           <Badge
                              variant="outline"
                              className="w-fit text-xs mt-1 border-primary/20 text-primary bg-primary/5"
                           >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              unverified
                           </Badge>
                        </div>
                     </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-2" />
                  <div className="p-1">
                  
                   
                     <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive transition-colors"
                     >
                        <LogOut className="mr-3 h-4 w-4" />
                        <span className="font-medium">Logout</span>
                     </DropdownMenuItem>
                  </div>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </header>
   );
}
