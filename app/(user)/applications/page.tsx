import TabsSection from "./sections/TabsSection";
import { FileText } from "lucide-react";

export default function MyApplications() {
   return (
      <div className="min-h-screen py-8">
         <div className="max-w-6xl mx-auto space-y-8">
            {/* Header Section */}
            <div>
               <div className="flex space-x-3 mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <h1 className="text-4xl font-bold">My Applications</h1>
               </div>
               <p className="text-muted-foreground text-lg mb-6">
                  View and manage all your project applications.
               </p>
            </div>

            <TabsSection />
         </div>
      </div>
   );
}
