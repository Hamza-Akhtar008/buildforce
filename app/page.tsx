"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GlobalContextProvider } from "@/contexts/globalContext";

export default function HomePage() {
   const router = useRouter();

   useEffect(() => {
      if (localStorage.getItem("selectedLanguage")) {
         router.push("/auth/register");
      } else {
         router.push("/auth/language-select");
      }
   }, [router]);

   return (
      <GlobalContextProvider>
         <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
            <div className="text-center">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
               <p className="mt-4 text-muted-foreground">Loading...</p>
            </div>
         </div>
      </GlobalContextProvider>
   );
}
