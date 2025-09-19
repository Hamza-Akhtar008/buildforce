"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   ArrowRight,
   Upload,
   FileText,
   IdCard,
   Award,
   Briefcase,
   CheckCircle,
   X,
   HardHat,
} from "lucide-react";

interface FileUpload {
   id: string;
   title: string;
   description: string;
   icon: React.ElementType;
   required: boolean;
   file: File | null;
   acceptedTypes: string;
}

export default function PreInterviewSubmissionsPage() {
   const router = useRouter();
   const [uploads, setUploads] = useState<FileUpload[]>([
      {
         id: "resume",
         title: "Resume/CV",
         description: "Upload your current resume or curriculum vitae",
         icon: FileText,
         required: true,
         file: null,
         acceptedTypes: ".pdf,.doc,.docx",
      },
      {
         id: "id_proof",
         title: "ID Proof",
         description:
            "Upload a valid government-issued ID (passport, driver's license, etc.)",
         icon: IdCard,
         required: true,
         file: null,
         acceptedTypes: ".pdf,.jpg,.jpeg,.png",
      },
      {
         id: "certificates",
         title: "Certificates",
         description:
            "Upload relevant professional certificates or training documents",
         icon: Award,
         required: false,
         file: null,
         acceptedTypes: ".pdf,.jpg,.jpeg,.png",
      },
      {
         id: "portfolio",
         title: "Portfolio",
         description: "Upload your work portfolio or project samples",
         icon: Briefcase,
         required: false,
         file: null,
         acceptedTypes: ".pdf,.jpg,.jpeg,.png,.zip",
      },
   ]);

   const handleFileUpload = (uploadId: string, file: File | null) => {
      setUploads((prev) =>
         prev.map((upload) =>
            upload.id === uploadId ? { ...upload, file } : upload
         )
      );
   };

   const removeFile = (uploadId: string) => {
      handleFileUpload(uploadId, null);
   };

   const canContinue = () => {
      const requiredUploads = uploads.filter((upload) => upload.required);
      return requiredUploads.every((upload) => upload.file !== null);
   };

   const handleContinue = () => {
      if (canContinue()) {
         // Handle form submission
         console.log("Submitted files:", uploads);
         // Navigate to project showcase page
         router.push("/unverified/preinterview-project-showcase");
      }
   };

   return (
      <div className="min-h-screen py-8 bg-background text-foreground">
         <div className="max-w-4xl mx-auto px-6 space-y-8">
            {/* Header Section */}
            <div className="space-y-6">
               <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                     <HardHat className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                     <h1 className="text-4xl font-bold">Document Submission</h1>
                     <p className="text-muted-foreground text-lg">
                        Upload your required documents to proceed
                     </p>
                  </div>
               </div>
            </div>

            {/* Welcome Card */}
            <Card className="shadow-lg border-primary/20">
               <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-primary">
                     Welcome to BuildForce
                  </CardTitle>
               </CardHeader>
               <CardContent className="text-center">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                     We're excited to have you join our construction workforce
                     platform. To complete your registration and move forward
                     with the interview process, please upload the required
                     documents below. This helps us verify your identity and
                     qualifications to ensure the best opportunities for you.
                  </p>
               </CardContent>
            </Card>

            {/* File Upload Section */}
            <div className="space-y-6">
               <h2 className="text-2xl font-bold">Required Documents</h2>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {uploads.map((upload) => {
                     const IconComponent = upload.icon;

                     return (
                        <Card key={upload.id} className="shadow-md">
                           <CardHeader>
                              <div className="flex items-center space-x-3">
                                 <div className="p-2 bg-primary/10 rounded-lg">
                                    <IconComponent className="h-6 w-6 text-primary" />
                                 </div>
                                 <div className="flex-1">
                                    <CardTitle className="text-lg flex items-center space-x-2">
                                       <span>{upload.title}</span>
                                       {upload.required && (
                                          <span className="text-red-500 text-sm">
                                             *
                                          </span>
                                       )}
                                       {!upload.required && (
                                          <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                                             Optional
                                          </span>
                                       )}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                       {upload.description}
                                    </p>
                                 </div>
                              </div>
                           </CardHeader>

                           <CardContent className="space-y-4">
                              {upload.file ? (
                                 <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
                                    <div className="flex items-center space-x-3">
                                       <CheckCircle className="h-5 w-5 text-green-600" />
                                       <div>
                                          <p className="text-sm font-medium">
                                             {upload.file.name}
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                             {(
                                                upload.file.size /
                                                1024 /
                                                1024
                                             ).toFixed(2)}{" "}
                                             MB
                                          </p>
                                       </div>
                                    </div>
                                    <Button
                                       variant="ghost"
                                       size="sm"
                                       onClick={() => removeFile(upload.id)}
                                       className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                       <X className="h-4 w-4" />
                                    </Button>
                                 </div>
                              ) : (
                                 <div className="space-y-3">
                                    <Label
                                       htmlFor={upload.id}
                                       className="cursor-pointer"
                                    >
                                       <div className="flex items-center justify-center p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors">
                                          <div className="text-center">
                                             <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                             <p className="text-sm font-medium">
                                                Click to upload {upload.title}
                                             </p>
                                             <p className="text-xs text-muted-foreground">
                                                Accepted formats:{" "}
                                                {upload.acceptedTypes
                                                   .replace(/\./g, "")
                                                   .toUpperCase()}
                                             </p>
                                          </div>
                                       </div>
                                    </Label>
                                    <Input
                                       id={upload.id}
                                       type="file"
                                       accept={upload.acceptedTypes}
                                       className="hidden"
                                       onChange={(e) => {
                                          const file =
                                             e.target.files?.[0] || null;
                                          handleFileUpload(upload.id, file);
                                       }}
                                    />
                                 </div>
                              )}
                           </CardContent>
                        </Card>
                     );
                  })}
               </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-center pt-8">
               <Button
                  onClick={handleContinue}
                  disabled={!canContinue()}
                  className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 px-8 py-3 text-lg"
               >
                  <span>Continue to Next Step</span>
                  <ArrowRight className="h-5 w-5" />
               </Button>
            </div>

            {/* Help Text */}
            <div className="text-center text-sm text-muted-foreground">
               <p>
                  Having trouble uploading files? Contact our support team at{" "}
                  <a
                     href="mailto:support@buildforce.com"
                     className="text-primary hover:underline"
                  >
                     support@buildforce.com
                  </a>
               </p>
            </div>
         </div>
      </div>
   );
}
