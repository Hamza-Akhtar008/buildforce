"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LanguageSelectPage() {
   const router = useRouter();
   const [selectedLanguage, setSelectedLanguage] = useState<string>("");

   const languages = [
      {
         code: "en",
         name: "English",
         flag: "/images/flags/english.png",
         country: "United States",
      },
      {
         code: "uk",
         name: "Ukrainian",
         flag: "/images/flags/ukraine.png",
         country: "Ukraine",
      },
      {
         code: "es",
         name: "Spanish",
         flag: "/images/flags/mexico.png",
         country: "Mexico",
      },
      {
         code: "ru",
         name: "Russian",
         flag: "/images/flags/russia.png",
         country: "Russia",
      },
   ];

   const handleLanguageSelect = (languageCode: string) => {
      setSelectedLanguage(languageCode);
      // You can store the selected language in localStorage or context
      localStorage.setItem("selectedLanguage", languageCode);
   };

   const handleContinue = () => {
      if (selectedLanguage) {
         localStorage.setItem("selectedLanguage", selectedLanguage);
         router.push("/auth/register");
      }
   };

   return (
      <div
         className="min-h-screen bg-background text-foreground relative flex items-center justify-center"
         style={{
            backgroundImage: "url('/images/world-map.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
         }}
      >
         {/* Dark overlay for better text readability */}
         <div className="absolute inset-0 bg-black/60"></div>

         <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-12">
               <h1 className="text-5xl font-bold mb-4 text-white">
                  Select Your Language
               </h1>
               <p className="text-xl text-gray-200">
                  Choose your preferred language to continue
               </p>
            </div>

            {/* Language Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
               {languages.map((language) => (
                  <Card
                     key={language.code}
                     className={`
                        relative overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
                        ${
                           selectedLanguage === language.code
                              ? "bg-primary/10 border-primary border-2 shadow-xl shadow-primary/30 ring-2 ring-primary/50 scale-105"
                              : "bg-card/90 border-border hover:bg-card hover:border-primary/50"
                        }
                        backdrop-blur-sm
                     `}
                     onClick={() => handleLanguageSelect(language.code)}
                  >
                     <div className="p-8 flex flex-col items-center text-center space-y-4 relative">
                        {/* Selection Indicator */}
                        {selectedLanguage === language.code && (
                           <div className="absolute top-4 right-4">
                              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg ring-2 ring-white/20 animate-pulse">
                                 <svg
                                    className="w-5 h-5 text-primary-foreground"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                 >
                                    <path
                                       fillRule="evenodd"
                                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                       clipRule="evenodd"
                                    />
                                 </svg>
                              </div>
                           </div>
                        )}

                        {/* Flag */}
                        <div className="flex-shrink-0 mb-4">
                           <img
                              src={language.flag}
                              alt={`${language.country} flag`}
                              className={`w-24 h-16 object-cover rounded-lg border transition-all duration-300 ${
                                 selectedLanguage === language.code
                                    ? "shadow-xl shadow-primary/20 border-primary/50 ring-1 ring-primary/30"
                                    : "shadow-lg border-border"
                              }`}
                           />
                        </div>

                        {/* Language Info */}
                        <div className="space-y-2">
                           <h3 className="text-xl font-bold text-card-foreground">
                              {language.name}
                           </h3>
                           <p className="text-muted-foreground text-sm">
                              {language.country}
                           </p>
                        </div>
                     </div>

                     {/* Hover Effect */}
                     <div className="absolute inset-0 bg-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </Card>
               ))}
            </div>

            {/* Continue Button */}
            {selectedLanguage && (
               <div className="text-center mt-12">
                  <Button
                     onClick={handleContinue}
                     className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                     Next
                  </Button>
               </div>
            )}

            {/* Skip Option */}
            <div className="text-center mt-8">
               <button
                  onClick={() => router.push("/auth/register")}
                  className="text-gray-300 hover:text-white transition-colors underline text-sm"
               >
                  Skip for now
               </button>
            </div>
         </div>
      </div>
   );
}
