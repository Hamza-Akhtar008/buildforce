"use client";
import { ReactNode, useEffect, useState } from "react";
import { BellIcon, CheckCircle, User, LogOut, Clock } from "lucide-react";
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
import { useGlobalContext } from "@/contexts/globalContext";
import { Button } from "../ui/button";
import { FetchUSer } from "@/lib/UserApi/user";
import { useAuth } from "@/contexts/AuthContext";
import { User as user } from "@/types";



export function Header({ children }: { children?: ReactNode }) {
   const router = useRouter();
const {auth,logout} =useAuth();

   const handleLogout = () => {
      // Clear any stored user data/tokens here if needed
      logout();
      router.push("/auth/signin");
   };
 const [user, setUser] = useState<user | null>(null);



   useEffect(()=>
   
   {
      const fetchuser = async ()=>
      {

         const response = await FetchUSer(auth?.id);
         setUser(response);
      }
      fetchuser();
   },[])

   const handleProfile = () => {
      router.push("/profile");
   };
   const [{ clockedIn, clockedInTime }] = useGlobalContext();
   const [currentTime, setCurrentTime] = useState(new Date());

   // Update timer every second when clocked in
   useEffect(() => {
      if (!clockedIn || !clockedInTime) return;

      const interval = setInterval(() => {
         setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(interval);
   }, [clockedIn, clockedInTime]);

   // Calculate elapsed time in seconds
   const getElapsedSeconds = () => {
      if (!clockedInTime) return 0;
      return Math.floor(
         (currentTime.getTime() - clockedInTime.getTime()) / 1000
      );
   };

   // Format time as HH:MM:SS
   const formatTime = (seconds: number) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours.toString().padStart(2, "0")}:${minutes
         .toString()
         .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
   };

   return (
      <header className="flex pl-80 items-center justify-between bg-background px-6 py-4 w-full border-b border-border sticky top-0 shadow-sm h-20">
         {/* <div className="flex items-center gap-6">{children}</div> */}
         <div></div>

         <div className="flex items-center gap-4">
            {clockedIn && clockedInTime && getElapsedSeconds() > 0 && (
               <div className="flex items-center bg-gradient-to-r from-primary/15 to-primary/10 rounded-lg px-4 py-2 border border-primary/30 shadow-sm">
                  <div className="flex items-center justify-center w-7 h-7 bg-primary/20 rounded-full mr-3">
                     <Clock className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-none">
                        Shift Time
                     </span>
                     <span className="text-base font-mono font-bold text-primary leading-tight mt-0.5">
                        {formatTime(getElapsedSeconds())}
                     </span>
                  </div>
               </div>
            )}
            {/* <div className="relative">
               <BellIcon className="text-muted-foreground hover:text-primary w-5 h-5 cursor-pointer transition-colors" />
               <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </div> */}
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
                          <Avatar className="h-10 w-10 cursor-pointer  transition-all">
                     <User className="h-6 w-6 text-primary" />
                  </Avatar>
                        <div className="flex flex-col space-y-1">
                           <p className="text-sm font-semibold leading-none text-foreground">
                              {user?.name || "User Name"}
                           </p>
                           <p className="text-xs text-muted-foreground">
                             {user?.role}
                           </p>
                           <Badge
                              variant="outline"
                              className="w-fit text-xs mt-1 border-primary/20 text-primary bg-primary/5"
                           >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                           </Badge>
                        </div>
                     </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-2" />
                  <div className="p-1">
                     <DropdownMenuItem
                        onClick={handleProfile}
                        className="cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary transition-colors"
                     >
                        <User className="mr-3 h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Profile</span>
                     </DropdownMenuItem>
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
