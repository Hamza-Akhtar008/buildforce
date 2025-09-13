import { ReactNode } from "react";
import { BellIcon, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function Header({ children }: { children?: ReactNode }) {
   return (
      <header className="flex flex-wrap items-center justify-between bg-background p-4 w-full border-b border-border sticky top-0 shadow-sm">
         <div className="flex items-center gap-4">
            {children}
            <BellIcon className="text-primary w-6 h-6" />
         </div>
         <div className="flex items-center gap-4">
            <Avatar>
               <AvatarImage src="https://github.com/shadcn.png" />
               <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
               <div className="text-lg font-semibold">Jhone Doe</div>
               <div className="text-sm text-muted-foreground">
                  Labor - Carpenter
               </div>
               <Badge variant="default" className="w-fit text-xs mt-1">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
               </Badge>
            </div>
         </div>
      </header>
   );
}
