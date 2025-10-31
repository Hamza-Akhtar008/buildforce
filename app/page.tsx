"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GlobalContextProvider } from "@/contexts/globalContext";
import Hero from "@/components/landingPage/hero";
import Header from "@/components/landingPage/header";
import Footer from "@/components/landingPage/footer";
import { StatsBanner } from "@/components/landingPage/Counter";
import { HireExperts } from "@/components/landingPage/Hire_Our_Expert";
import { ManageField } from "@/components/landingPage/manage-field";
import { Testimonials } from "@/components/landingPage/testimonials";
import { FAQ } from "@/components/landingPage/faq";
import { Newsletter } from "@/components/landingPage/newsletter";
const expertData = [
  {
    id: "1",
    name: "Adam J.",
    location: "Austin",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Adam1",
    badge: "All-Star\nWould Rehire",
    projects: 3,
    hours: 534,
    attendanceRate: 98,
  },
  {
    id: "2",
    name: "Adam J.",
    location: "Austin",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Adam2",
    badge: "All-Star\nWould Rehire",
    projects: 3,
    hours: 534,
    attendanceRate: 98,
  },
  {
    id: "3",
    name: "Adam J.",
    location: "Austin",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Adam3",
    badge: "All-Star\nWould Rehire",
    projects: 3,
    hours: 534,
    attendanceRate: 98,
  },
  {
    id: "4",
    name: "Adam J.",
    location: "Austin",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Adam4",
    badge: "All-Star\nWould Rehire",
    projects: 3,
    hours: 534,
    attendanceRate: 98,
  },
  {
    id: "5",
    name: "Adam J.",
    location: "Austin",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Adam5",
    badge: "All-Star\nWould Rehire",
    projects: 3,
    hours: 534,
    attendanceRate: 98,
  },
  {
    id: "6",
    name: "Adam J.",
    location: "Austin",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Adam6",
    badge: "All-Star\nWould Rehire",
    projects: 3,
    hours: 534,
    attendanceRate: 98,
  },
]
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
      <StatsBanner/>
      <HireExperts experts={expertData}/>
      <ManageField/>
      <Testimonials/>
      <FAQ/>
      <Newsletter/>
      <Footer />
     </div>
   );
}
