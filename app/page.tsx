"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GlobalContextProvider } from "@/contexts/globalContext";
import Hero from "@/components/landingPage/hero";
import Header from "@/components/landingPage/header";
import Footer from "@/components/landingPage/footer";

export default function HomePage() {
   const router = useRouter();

   // useEffect(() => {
   //    if (localStorage.getItem("selectedLanguage")) {
   //       router.push("/auth/register");
   //    } else {
   //       router.push("/auth/language-select");
   //    }
   // }, [router]);

   return (
     <div className="bg-[#222222] py-10 px-25 flex flex-col gap-8">
      <Header />
      <Hero />
      <Footer />
     </div>
   );
}
