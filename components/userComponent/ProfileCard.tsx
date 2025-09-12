import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Star, Globe, Award, Lock } from "lucide-react";
import React, { useState } from "react";

const navigationCards = [
  { id: 1, title: "Experience Section", icon: Briefcase, link: "/profile/experience" },
  { id: 2, title: "Skill Section", icon: Star, link: "/profile/skills" },
  { id: 3, title: "Languages", icon: Globe, link: "/profile/languages" },
  { id: 4, title: "Licenses and Certificates", icon: Award, link: "/profile/certificates" },
  { id: 5, title: "Update Password", icon: Lock, link: "/profile/password" }
];

const ProfileCard = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  return (
    <div className="w-full max-w-2xl mx-auto flex-shrink-0">
      <div className="mt-2">
        <h3 className="text-lg font-semibold text-primary mb-4 px-2">Quick Access</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {navigationCards.map((card) => {
            const IconComponent = card.icon;
            const isHovered = hoveredCard === card.id;
            return (
              <Link href={card.link} key={card.id} className="block">
                <Card
                  className={`cursor-pointer transition-all duration-200 border-none shadow-lg rounded-xl flex items-center justify-center h-32 ${
                    isHovered ? 'bg-primary' : 'bg-card'
                  }`}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardContent className="flex items-center justify-center h-full p-6">
                    <IconComponent 
                      className={`mr-3 h-7 w-7 ${
                        isHovered ? 'text-primary-foreground' : 'text-primary'
                      }`} 
                    />
                    <span 
                      className={`font-semibold text-base text-center whitespace-nowrap ${
                        isHovered ? 'text-primary-foreground' : 'text-foreground'
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
      </div>
    </div>
  );
};

export default ProfileCard;
