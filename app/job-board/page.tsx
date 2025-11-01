"use client";




import Header from "@/components/landingPage/header";
import Footer from "@/components/landingPage/footer";
import Sidebar from "@/components/jobboard/sidebar";
import JobDetails from "@/components/jobboard/job-details";


export default function Page() {


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
 <div className="flex">
        <Sidebar />
        <JobDetails />
      </div>
      <Footer />
     </div>
   );
}
