"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginUser } from "@/lib/AuthAPi/auth";
import { notifyError, notifySuccess } from "@/lib/toast";
import { useAuth } from "@/contexts/AuthContext";

export default function SignInPage() {
    const { auth,loading,login } = useAuth();
   const router = useRouter();
   const [Email,setEmail]=useState("");
   const [password,setPassword]=useState("");

   const [showPassword, setShowPassword] = useState(false);

   useEffect(() => {
    if (auth) {
     
        if (auth.role === "Labour") {
         if(auth.verificationStatus=="pending")
         {

            router.push("/unverified/skills-selection")
         }
         else if(auth.verificationStatus=="submitted")
         {
              router.push("/unverified/document-submitted");
         }
         else if (auth.verificationStatus=="interview")
         {
            router.push("/unverified/select-interview");
         }
         else if(auth.verificationStatus=="verified")
         {
            router.push("/Dashboard");
         }
        } else if (auth.role === "Admin") {
          router.push("/admin") // or your user dashboard
       
      
    } 
   }
  }, [auth, router])
  
  const handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // ✅ Frontend validation
  if (!Email) {
    notifyError("Please enter your email");
    return;
  }
  if (!password) {
    notifyError("Please enter your password");
    return;
  }

  const payload = {
    email: Email,
    password: password,
  };

  try {
    const response = await LoginUser(payload);

    // ✅ Check if API returned a valid response
    if (response?.statusCode === 200 || response?.access_token) {
      notifySuccess("Login Successful");
      login(response);

      // ✅ Conditional routing based on role & verification
      if (response.role === "Labour") {
        if (response.verificationStatus === "pending") {
          router.push("/unverified/skills-selection");
        } else {
          router.push("/unverified/select-interview");
        }
      } else {
        router.push("/admin");
      }
    } else {
      // ✅ Show backend message if available
      notifyError(
        response?.message ||
          response?.error ||
          "Login failed. Please check your credentials."
      );
    }
  } catch (error: any) {
    // ✅ Handle network or unexpected errors
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Unable to login. Please try again later.";

    notifyError(errorMessage);
  }
};

   return (
      <div className="min-h-screen bg-background text-foreground">
         {/* Desktop Layout */}
         <div className="hidden md:flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-md p-8 bg-card shadow-lg">
               {/* Logo at top */}
               <div className="flex justify-center mb-6">
                  <img
                     src="/images/logo.png"
                     alt="Logo"
                     className="w-24 h-24 object-contain"
                  />
               </div>

               <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
                  
                  <p className="text-muted-foreground">
                     Sign in to your account to continue
                  </p>
               </div>

               <form onSubmit={handlelogin} className="space-y-6">
                  {/* Email */}
                  <div className="relative">
                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input
                     value={Email}
                     onChange={(e)=>setEmail(e.target.value)}
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        required
                        className="pl-10 h-11 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                     />
                  </div>

                  {/* Password */}
                  <div className="relative">
                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                        className="pl-10 pr-10 h-11 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                     />
                     <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                     >
                        {showPassword ? (
                           <EyeOff className="h-4 w-4" />
                        ) : (
                           <Eye className="h-4 w-4" />
                        )}
                     </button>
                  </div>

                  {/* Remember me + Forgot */}
                  <div className="flex items-center justify-between text-sm pt-2">
                     <label className="flex items-center space-x-2">
                        <input
                           type="checkbox"
                           className="w-4 h-4 rounded border-2 border-border bg-card text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-colors"
                        />
                        <span className="text-muted-foreground">
                           Remember me
                        </span>
                     </label>
                     <a
                        href="#"
                        className="text-primary hover:underline transition-colors"
                     >
                        Forgot password?
                     </a>
                  </div>

                  {/* Sign in Button */}
                  <Button
                     type="submit"
                     className="w-full h-12 bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] mt-8"
                  >
                     Sign in
                  </Button>
               </form>

               {/* Footer */}
               <div className="mt-8 text-center">
                  <p className="text-sm text-muted-foreground">
                     Don&apos;t have an account?{" "}
                     <Link
                        href="/auth/register"
                        className="text-primary hover:underline transition-colors font-medium"
                     >
                        Sign up
                     </Link>
                  </p>
               </div>
            </Card>
         </div>

         {/* Mobile Layout */}
         <div className="md:hidden min-h-screen flex flex-col">
            <div className="flex-1 flex items-center justify-center p-4">
               <div className="w-full max-w-sm space-y-8">
                  <div className="text-center">
                     <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
                     <p className="text-muted-foreground">
                        Sign in to your account to continue
                     </p>
                  </div>

                  <form onSubmit={handlelogin} className="space-y-6">
                     {/* Email */}
                     <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                        value={Email}
                        onChange={(e)=>setEmail(e.target.value)}
                           id="email"
                           type="email"
                           placeholder="Enter your email address"
                           required
                           className="pl-10 h-12 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        />
                     </div>

                     {/* Password */}
                     <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                           id="password"
                           value={password}
                           onChange={(e)=>setPassword(e.target.value)}
                           type={showPassword ? "text" : "password"}
                           placeholder="Enter your password"
                           required
                           className="pl-10 pr-10 h-12 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        />
                        <button
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                           {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                           ) : (
                              <Eye className="h-4 w-4" />
                           )}
                        </button>
                     </div>

                     {/* Remember me + Forgot */}
                     <div className="flex items-center justify-between text-sm pt-2">
                        <label className="flex items-center space-x-2">
                           <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-2 border-border bg-card text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-colors"
                           />
                           <span className="text-muted-foreground">
                              Remember me
                           </span>
                        </label>
                        <a
                           href="#"
                           className="text-primary hover:underline transition-colors"
                        >
                           Forgot password?
                        </a>
                     </div>

                     {/* Sign in Button */}
                     <Button
                        type="submit"
                        className="w-full h-12 bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] mt-8"
                     >
                        Sign in
                     </Button>
                  </form>

                  {/* Footer */}
                  <div className="mt-8 text-center">
                     <p className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link
                           href="/auth/register"
                           className="text-primary hover:underline transition-colors font-medium"
                        >
                           Sign up
                        </Link>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
