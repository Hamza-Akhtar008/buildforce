
import { Unverified_header } from "@/components/common/unverified-sidebar";

export default function AdminLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div className="dark min-h-screen bg-background text-foreground">
        
            <Unverified_header />
            <div className="container mx-auto p-6">{children}</div>
       
      </div>
   );
}
