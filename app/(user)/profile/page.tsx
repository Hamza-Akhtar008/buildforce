'use client'
import AdminCards from "@/components/adminComponent/adminCards";
import MyProfile from "@/components/userComponent/MyProfile";

import { Briefcase, Star, Globe, Award, Lock } from "lucide-react";

const navigationCards = [
   {
     
      title: "Experience Section",
      icon: Briefcase,
      link: "/profile/experience",
   },
   {  title: "Skill Section", icon: Star, link: "/profile/skills" },
   { title: "Languages", icon: Globe, link: "/profile/languages" },
   {
    
      title: "Licenses and Certificates",
      icon: Award,
      link: "/profile/certificates",
   },
   {  title: "Update Password", icon: Lock, link: "/profile/password" },
];
const ProfilePage = () => {
  return <>
  <MyProfile />
  <AdminCards sections={navigationCards}/>
  </>;
};

export default ProfilePage;
