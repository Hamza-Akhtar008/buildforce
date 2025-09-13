import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Star, Globe, Award, Lock } from "lucide-react";
import React, { useState } from "react";

const navigationCards = [
   {
      id: 1,
      title: "Experience Section",
      icon: Briefcase,
      link: "/profile/experience",
   },
   { id: 2, title: "Skill Section", icon: Star, link: "/profile/skills" },
   { id: 3, title: "Languages", icon: Globe, link: "/profile/languages" },
   {
      id: 4,
      title: "Licenses and Certificates",
      icon: Award,
      link: "/profile/certificates",
   },
   { id: 5, title: "Update Password", icon: Lock, link: "/profile/password" },
];

const ProfileCard = () => {
   const [hoveredCard, setHoveredCard] = useState<number | null>(null);
   return (
      <Card className="shadow-lg mt-8">
         <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Quick Access</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {navigationCards.map((card) => {
                  const IconComponent = card.icon;
                  const isHovered = hoveredCard === card.id;
                  return (
                     <Link href={card.link} key={card.id} className="block">
                        <Card
                           className={`cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center h-24 ${
                              isHovered ? "bg-primary" : "bg-background"
                           }`}
                           onMouseEnter={() => setHoveredCard(card.id)}
                           onMouseLeave={() => setHoveredCard(null)}
                        >
                           <CardContent className="flex items-center justify-center h-full p-4">
                              <IconComponent
                                 className={`mr-3 h-5 w-5 ${
                                    isHovered
                                       ? "text-primary-foreground"
                                       : "text-primary"
                                 }`}
                              />
                              <span
                                 className={`font-medium text-sm text-center ${
                                    isHovered
                                       ? "text-primary-foreground"
                                       : "text-foreground"
                                 }`}
                              >
                                 {card.title}
                              </span>
                           </CardContent>
                        </Card>
                     </Link>
                  );
               })}
            </div>
         </CardContent>
      </Card>
   );
};

export default ProfileCard;
