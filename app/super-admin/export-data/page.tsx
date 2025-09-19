import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";

export default function ExportData() {
   return (
      <div className="min-h-screen py-8">
         <div className="max-w-6xl mx-auto space-y-8">
            {/* Header Section */}
            <div >
               <div className="flex space-x-3 mb-4">
                  <Download className="h-8 w-8 text-primary" />
                  <h1 className="text-4xl font-bold">Export Data</h1>
               </div>
               <p className="text-muted-foreground text-lg mb-6">
                  This is the export data page. Here you can export reports and
                  data.
               </p>

               <Link href="/admin" className="cursor-pointer">
                  <Button
                     variant="ghost"
                     className="text-primary hover:bg-primary/10 flex items-center space-x-2 cursor-pointer"
                  >
                     <ArrowLeft className="h-4 w-4" />
                     <span>Back to Dashboard</span>
                  </Button>
               </Link>
            </div>

            {/* Content Section */}
            <Card className="p-8 shadow-lg">
               <div className="text-center">
                  <h2 className="text-2xl font-semibold mb-4">
                     Data Export Tools
                  </h2>
                  <p className="text-muted-foreground">
                     Data export functionality will be implemented here.
                  </p>
               </div>
            </Card>
         </div>
      </div>
   );
}
