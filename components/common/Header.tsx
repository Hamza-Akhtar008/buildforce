import { ReactNode } from "react";
import { BellIcon } from "lucide-react"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header({ children }: { children?: ReactNode }) {
  return (
    <header className="flex flex-wrap items-center justify-between bg-gray-900 p-4 w-full border-b border-gray-800 sticky top-0">
      <div className="flex items-center gap-4">
        {children}
        <BellIcon className="text-yellow-500 w-6 h-6" />
      </div>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-lg font-semibold text-white">Jhone Doe</div>
          <div className="text-sm text-gray-300">Labor- Carpenter</div>
          <div className="text-green-400 font-bold text-xs">Verified</div>
        </div>
      </div>
    </header>
  );
}