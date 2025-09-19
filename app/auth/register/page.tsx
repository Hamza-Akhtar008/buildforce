"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
   InputOTP,
   InputOTPGroup,
   InputOTPSlot,
} from "@/components/ui/input-otp";

import { User, Phone, MapPin, Lock, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
   const [showOTP, setShowOTP] = useState(false);
   const [phoneNumber, setPhoneNumber] = useState("");
   const [otpValue, setOtpValue] = useState("");
   const [isResending, setIsResending] = useState(false);
   const router = useRouter();
   const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const phone = formData.get("phone") as string;

      // Store phone number for OTP display
      setPhoneNumber(phone);

      // Here you would normally send the registration data to your API
      // For now, we'll just show the OTP screen
      setShowOTP(true);
   };

   const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (otpValue.length !== 6) {
         alert("Please enter a complete 6-digit OTP");
         return;
      }
      router.push("/unverified/skills-selection");

      // Here you would verify the OTP with your API
      console.log("Verifying OTP:", otpValue);

      // For demo purposes, just show success message
      alert("Registration successful!");
   };

   const handleResendOTP = async () => {
      setIsResending(true);

      // Simulate API call
      setTimeout(() => {
         setIsResending(false);
         alert("OTP has been resent to your phone number");
      }, 2000);
   };

   const handleBackToRegister = () => {
      setShowOTP(false);
      setOtpValue("");
   };

   const maskPhoneNumber = (phone: string) => {
      if (phone.length < 4) return phone;
      const visibleDigits = phone.slice(-3);
      const maskedPart = "*".repeat(phone.length - 3);
      return maskedPart + visibleDigits;
   };

   if (showOTP) {
      return (
         <div className="min-h-screen bg-background text-foreground">
            {/* Desktop Layout */}
            <div className="hidden md:flex min-h-screen items-center justify-center">
               <Card className="w-full max-w-md p-8 bg-card shadow-lg">
                  {/* Back Button */}
                  <button
                     onClick={handleBackToRegister}
                     className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
                  >
                     <ArrowLeft className="h-4 w-4" />
                     <span className="text-sm">Back to Registration</span>
                  </button>

                  <div className="text-center mb-8">
                     <h1 className="text-3xl font-bold mb-2">
                        Verify Your Phone
                     </h1>
                     <p className="text-muted-foreground mb-4">
                        We've sent a 6-digit verification code to
                     </p>
                     <p className="text-lg font-semibold text-primary">
                        {maskPhoneNumber(phoneNumber)}
                     </p>
                  </div>

                  <form onSubmit={handleOTPSubmit} className="space-y-6">
                     {/* OTP Input */}
                     <div className="flex justify-center">
                        <InputOTP
                           maxLength={6}
                           value={otpValue}
                           onChange={(value) => setOtpValue(value)}
                           className="gap-3"
                        >
                           <InputOTPGroup className="gap-3">
                              <InputOTPSlot
                                 index={0}
                                 className="w-14 h-14 text-xl font-semibold"
                              />
                              <InputOTPSlot
                                 index={1}
                                 className="w-14 h-14 text-xl font-semibold"
                              />
                              <InputOTPSlot
                                 index={2}
                                 className="w-14 h-14 text-xl font-semibold"
                              />
                              <InputOTPSlot
                                 index={3}
                                 className="w-14 h-14 text-xl font-semibold"
                              />
                              <InputOTPSlot
                                 index={4}
                                 className="w-14 h-14 text-xl font-semibold"
                              />
                              <InputOTPSlot
                                 index={5}
                                 className="w-14 h-14 text-xl font-semibold"
                              />
                           </InputOTPGroup>
                        </InputOTP>
                     </div>

                     {/* Verify Button */}
                     <Button
                        type="submit"
                        className="w-full h-12 bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                     >
                        Verify & Complete Registration
                     </Button>
                  </form>

                  {/* Resend OTP */}
                  <div className="mt-6 text-center">
                     <p className="text-sm text-muted-foreground mb-3">
                        Didn't receive the code?
                     </p>
                     <button
                        onClick={handleResendOTP}
                        disabled={isResending}
                        className="text-primary hover:underline transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        {isResending ? "Resending..." : "Resend OTP"}
                     </button>
                  </div>
               </Card>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden min-h-screen flex flex-col">
               <div className="flex-1 flex items-center justify-center p-4">
                  <div className="w-full max-w-sm space-y-8">
                     {/* Back Button */}
                     <button
                        onClick={handleBackToRegister}
                        className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                     >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">Back to Registration</span>
                     </button>

                     <div className="text-center">
                        <h1 className="text-3xl font-bold mb-2">
                           Verify Your Phone
                        </h1>
                        <p className="text-muted-foreground mb-4">
                           We've sent a 6-digit verification code to
                        </p>
                        <p className="text-lg font-semibold text-primary">
                           {maskPhoneNumber(phoneNumber)}
                        </p>
                     </div>

                     <form onSubmit={handleOTPSubmit} className="space-y-6">
                        {/* OTP Input */}
                        <div className="flex justify-center">
                           <InputOTP
                              maxLength={6}
                              value={otpValue}
                              onChange={(value) => setOtpValue(value)}
                              className="gap-3"
                           >
                              <InputOTPGroup className="gap-3">
                                 <InputOTPSlot
                                    index={0}
                                    className="w-14 h-14 text-xl font-semibold"
                                 />
                                 <InputOTPSlot
                                    index={1}
                                    className="w-14 h-14 text-xl font-semibold"
                                 />
                                 <InputOTPSlot
                                    index={2}
                                    className="w-14 h-14 text-xl font-semibold"
                                 />
                                 <InputOTPSlot
                                    index={3}
                                    className="w-14 h-14 text-xl font-semibold"
                                 />
                                 <InputOTPSlot
                                    index={4}
                                    className="w-14 h-14 text-xl font-semibold"
                                 />
                                 <InputOTPSlot
                                    index={5}
                                    className="w-14 h-14 text-xl font-semibold"
                                 />
                              </InputOTPGroup>
                           </InputOTP>
                        </div>

                        {/* Verify Button */}
                        <Button
                           type="submit"
                           className="w-full h-12 bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                        >
                           Verify & Complete Registration
                        </Button>
                     </form>

                     {/* Resend OTP */}
                     <div className="mt-8 text-center">
                        <p className="text-sm text-muted-foreground mb-3">
                           Didn't receive the code?
                        </p>
                        <button
                           onClick={handleResendOTP}
                           disabled={isResending}
                           className="text-primary hover:underline transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           {isResending ? "Resending..." : "Resend OTP"}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-background text-foreground">
         {/* Desktop Layout */}
         <div className="hidden md:flex min-h-screen">
            {/* Left Section - Logo */}
            <div className="flex items-center justify-center w-1/2">
               <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="w-48 h-48 object-contain"
               />
            </div>

            {/* Right Section - Form */}
            <div className="flex items-center justify-center w-3/4">
               <Card className="w-full max-w-2xl p-8 bg-card shadow-lg">
                  <h2 className="text-2xl font-bold mb-6 text-center">
                     Register
                  </h2>
                  <form onSubmit={handleRegisterSubmit} className="space-y-6">
                     {/* Full Name */}
                     <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                           id="fullName"
                           name="fullName"
                           type="text"
                           placeholder="Enter your full name"
                           required
                           className="pl-10 h-11 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        />
                     </div>

                     {/* Phone */}
                     <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                           id="phone"
                           name="phone"
                           type="tel"
                           placeholder="Enter your phone number"
                           required
                           className="pl-10 h-11 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        />
                     </div>

                     {/* Location */}
                     <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                        <Input
                           id="location"
                           type="text"
                           placeholder="Enter your location"
                           required
                           className="pl-10 h-11 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        />
                     </div>

                     {/* Password */}
                     <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                           id="password"
                           type="password"
                           placeholder="Create a strong password"
                           required
                           className="pl-10 h-11 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        />
                     </div>

                     {/* Confirm Password */}
                     <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                           id="confirmPassword"
                           type="password"
                           placeholder="Confirm your password"
                           required
                           className="pl-10 h-11 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        />
                     </div>

                     {/* Agreement */}
                     <div className="flex items-center space-x-3 pt-2">
                        <input
                           type="checkbox"
                           id="agreement"
                           className="w-4 h-4 rounded border-2 border-border bg-card text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-colors"
                        />
                        <label
                           htmlFor="agreement"
                           className="text-sm text-muted-foreground leading-relaxed"
                        >
                           I agree to the{" "}
                           <span className="text-primary hover:underline cursor-pointer transition-colors">
                              terms & conditions
                           </span>
                        </label>
                     </div>

                     {/* Register Button */}
                     <Button
                        type="submit"
                        className="w-full h-12 bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] mt-8"
                     >
                        Create Account
                     </Button>

                     {/* Already have an account */}
                     <p className="text-center text-sm text-muted-foreground mt-6">
                        Already have an account?{" "}
                        <Link
                           href="/auth/signin"
                           className="text-primary hover:underline transition-colors font-medium"
                        >
                           Sign in
                        </Link>
                     </p>
                  </form>
               </Card>
            </div>
         </div>

         {/* Mobile Layout */}
         <div className="md:hidden min-h-screen flex flex-col">
            <div className="flex-1 flex items-center justify-center p-4">
               <div className="w-full max-w-md space-y-8">
                  <div className="text-center">
                     <h2 className="text-3xl font-bold mb-2">Register</h2>
                     <p className="text-muted-foreground">
                        Create your account to get started
                     </p>
                  </div>

                  <form onSubmit={handleRegisterSubmit} className="space-y-6">
                     {/* Full Name */}
                     <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                           id="fullName"
                           name="fullName"
                           type="text"
                           placeholder="Enter your full name"
                           required
                           className="pl-10 h-12 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        />
                     </div>

                     {/* Phone */}
                     <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                           id="phone"
                           name="phone"
                           type="tel"
                           placeholder="Enter your phone number"
                           required
                           className="pl-10 h-12 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        />
                     </div>

                     {/* Location */}
                     <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                        <Input
                           id="location"
                           type="text"
                           placeholder="Enter your location"
                           required
                           className="pl-10 h-12 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        />
                     </div>

                     {/* Password */}
                     <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                           id="password"
                           type="password"
                           placeholder="Create a strong password"
                           required
                           className="pl-10 h-12 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        />
                     </div>

                     {/* Confirm Password */}
                     <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                           id="confirmPassword"
                           type="password"
                           placeholder="Confirm your password"
                           required
                           className="pl-10 h-12 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        />
                     </div>

                     {/* Agreement */}
                     <div className="flex items-center space-x-3 pt-2">
                        <input
                           type="checkbox"
                           id="agreement"
                           className="w-4 h-4 rounded border-2 border-border bg-card text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-colors"
                        />
                        <label
                           htmlFor="agreement"
                           className="text-sm text-muted-foreground leading-relaxed"
                        >
                           I agree to the{" "}
                           <span className="text-primary hover:underline cursor-pointer transition-colors">
                              terms & conditions
                           </span>
                        </label>
                     </div>

                     {/* Register Button */}
                     <Button
                        type="submit"
                        className="w-full h-12 bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] mt-8"
                     >
                        Create Account
                     </Button>

                     {/* Already have an account */}
                     <p className="text-center text-sm text-muted-foreground mt-6">
                        Already have an account?{" "}
                        <Link
                           href="/auth/signin"
                           className="text-primary hover:underline transition-colors font-medium"
                        >
                           Sign in
                        </Link>
                     </p>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}
