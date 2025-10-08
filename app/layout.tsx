"use client";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlobalContextProvider } from "@/contexts/globalContext";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "@/contexts/AuthContext";
const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

// export const metadata: Metadata = {
//    title: "Build Force",
// };

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <AuthProvider>

      <html lang="en" suppressHydrationWarning>
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
            <ThemeProvider
               attribute="class"
               defaultTheme="system"
               enableSystem
               disableTransitionOnChange
            >
               <GlobalContextProvider>{children}</GlobalContextProvider>
               <Toaster />
               {/* {children} */}
            </ThemeProvider>
         </body>
      </html>
               </AuthProvider>
   );
}
