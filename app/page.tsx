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
import Image from "next/image";

const expertData = [
  {
    id: "1",
    name: "Adam J.",
    location: "Austin",
    image: "/images/employees/emp1.svg",
    badge: "All-Star\nWould Rehire",
    projects: 3,
    hours: 534,
    attendanceRate: 98,
  },
  {
    id: "2",
    name: "Adam J.",
    location: "Austin",
    image: "/images/employees/emp2.svg",
    badge: "All-Star\nWould Rehire",
    projects: 3,
    hours: 534,
    attendanceRate: 98,
  },
  {
    id: "3",
    name: "Adam J.",
    location: "Austin",
    image: "/images/employees/emp3.svg",
    badge: "All-Star\nWould Rehire",
    projects: 3,
    hours: 534,
    attendanceRate: 98,
  },
  {
    id: "4",
    name: "Adam J.",
    location: "Austin",
    image: "/images/employees/emp4.svg",
    badge: "All-Star\nWould Rehire",
    projects: 3,
    hours: 534,
    attendanceRate: 98,
  },
  {
    id: "5",
    name: "Adam J.",
    location: "Austin",
    image: "/images/employees/emp5.svg",
    badge: "All-Star\nWould Rehire",
    projects: 3,
    hours: 534,
    attendanceRate: 98,
  },
  {
    id: "6",
    name: "Adam J.",
    location: "Austin",
    image: "/images/employees/emp6.svg",
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
