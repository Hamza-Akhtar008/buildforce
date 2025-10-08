"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Toaster, toast } from 'react-hot-toast';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { LocationSelector, type LocationValue } from "@/components/location-selector"

import { User, Phone, Lock, ArrowLeft, Eye, EyeOff, Mail } from "lucide-react"

import { UserRole } from "@/types/enum"
import { RegisterUSer } from "@/lib/AuthAPi/auth"
import { notifyError, notifySuccess } from "@/lib/toast";
import { useAuth } from "@/contexts/AuthContext";


export default function RegisterPage() {
  const router = useRouter()

  const [Fullname, setFullname] = useState("")
  const [showOTP, setShowOTP] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [Email, setEmail] = useState("") // add Email state
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const [otpValue, setOtpValue] = useState("")
  const [isResending, setIsResending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreement, setAgreement] = useState(false) // add agreement state for controlled checkbox

  const [location, setLocation] = useState<LocationValue>({})
const {auth} = useAuth();
   useEffect(() => {
      if (auth) {
       
          if (auth.role === "Labour") {
            router.push("/unverified/skills-selection")
          } else if (auth.role === "Admin") {
            router.push("/admin") // or your user dashboard
         
        
      } 
     }
    }, [auth, router])
    
  const passwordSchemaOk = (pwd: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(pwd)

  const phoneOk = (p: string) => /^\+?\d{10,15}$/.test(p)

  const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

  const validateRegisterState = () => {
    const fullName = (Fullname || "").trim()
    const phone = phoneNumber || ""
    const email = Email || ""
    const { region, state, county } = location
    const pwd = Password || ""
    const cpwd = ConfirmPassword || ""

    if (!fullName || fullName.length < 2) {
      notifyError("Please enter your full name (at least 2 characters)")
      return false
    }
    if (!phoneOk(phone)) {
     notifyError("Enter a valid phone number (10–15 digits, optional +)")
      return false
    }
    if (!email || !emailOk(email)) {
      notifyError("Please enter a valid email address")
      return false
    }
    if (!region || !state || !county) {
      notifyError("Please select region, state, county, and city")
      return false
    }
    if (!passwordSchemaOk(pwd)) {
      notifyError("Password must be 8+ chars with upper, lower, number, and symbol")
      return false
    }
    if (pwd !== cpwd) {
      notifyError("Passwords do not match")
      return false
    }
    if (!agreement) {
      notifyError("You must agree to the terms and conditions")
      return false
    }
    return true
  }

  const handleRegisterClick = async () => {
    if (!validateRegisterState()) return
    const payload = {
      name:Fullname,
      email:Email,
      phone:phoneNumber,
      location: `${location.region},${location.state},${location.county}`,
      password:Password,
      role: UserRole.LABOUR
    }
    
const response =await  RegisterUSer(payload);
  if(response)
  {
    notifySuccess("Registration Succefull")

  }
  else{
    notifyError("Registration Failed")
  }
    // setShowOTP(true)
    // toast.success("Verification code sent to your phone")
  }

  const handleOTPClick = async () => {
    if (otpValue.length !== 6) {
      notifyError("Please enter a complete 6-digit OTP")
      return
    }
    router.push("/unverified/skills-selection")
    console.log("Verifying OTP:", otpValue)
    notifySuccess("Registration successful!")
  }

  const handleResendOTP = async () => {
    setIsResending(true)
    setTimeout(() => {
      setIsResending(false)
      notifySuccess("OTP has been resent to your phone number")
    }, 2000)
  }

  const handleBackToRegister = () => {
    setShowOTP(false)
    setOtpValue("")
  }

  const maskPhoneNumber = (phone: string) => {
    if (phone.length < 4) return phone
    const visibleDigits = phone.slice(-3)
    const maskedPart = "*".repeat(phone.length - 3)
    return maskedPart + visibleDigits
  }

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
              <h1 className="text-3xl font-bold mb-2">Verify Your Phone</h1>
              <p className="text-muted-foreground mb-4">We&apos;ve sent a 6-digit verification code to</p>
              <p className="text-lg font-semibold text-primary">{maskPhoneNumber(phoneNumber)}</p>
            </div>

            {/* OTP Input */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otpValue} onChange={(value) => setOtpValue(value)} className="gap-3">
                  <InputOTPGroup className="gap-3">
                    <InputOTPSlot index={0} className="w-14 h-14 text-xl font-semibold" />
                    <InputOTPSlot index={1} className="w-14 h-14 text-xl font-semibold" />
                    <InputOTPSlot index={2} className="w-14 h-14 text-xl font-semibold" />
                    <InputOTPSlot index={3} className="w-14 h-14 text-xl font-semibold" />
                    <InputOTPSlot index={4} className="w-14 h-14 text-xl font-semibold" />
                    <InputOTPSlot index={5} className="w-14 h-14 text-xl font-semibold" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {/* Verify Button */}
              <Button
                type="button"
                onClick={handleOTPClick}
                className="w-full h-12 bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                Verify &amp; Complete Registration
              </Button>
            </form>

            {/* Resend OTP */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">Didn&apos;t receive the code?</p>
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
                <h1 className="text-3xl font-bold mb-2">Verify Your Phone</h1>
                <p className="text-muted-foreground mb-4">We&apos;ve sent a 6-digit verification code to</p>
                <p className="text-lg font-semibold text-primary">{maskPhoneNumber(phoneNumber)}</p>
              </div>

              {/* OTP Input */}
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={otpValue} onChange={(value) => setOtpValue(value)} className="gap-3">
                    <InputOTPGroup className="gap-3">
                      <InputOTPSlot index={0} className="w-14 h-14 text-xl font-semibold" />
                      <InputOTPSlot index={1} className="w-14 h-14 text-xl font-semibold" />
                      <InputOTPSlot index={2} className="w-14 h-14 text-xl font-semibold" />
                      <InputOTPSlot index={3} className="w-14 h-14 text-xl font-semibold" />
                      <InputOTPSlot index={4} className="w-14 h-14 text-xl font-semibold" />
                      <InputOTPSlot index={5} className="w-14 h-14 text-xl font-semibold" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {/* Verify Button */}
                <Button
                  type="button"
                  onClick={handleOTPClick}
                  className="w-full h-12 bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Verify &amp; Complete Registration
                </Button>
              </form>

              {/* Resend OTP */}
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground mb-3">Didn&apos;t receive the code?</p>
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
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen justify-center items-center m-8">
        <Card className="w-full max-w-2xl p-8 bg-card shadow-lg">
          {/* Logo Section */}
          <div className="flex items-center justify-center ">
            <img src="/images/logo.png" alt="Logo" className="w-48 h-48 object-contain" />
          </div>

          {/* Form Section */}
          <h2 className="text-2xl font-bold mb-6 text-center">Register as Labour</h2>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="fullName"
                name="fullName"
                onChange={(e) => setFullname(e.target.value)}
                value={Fullname}
                type="text"
                placeholder="Enter your full name"
                required
                className="pl-10 h-11 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                name="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
                inputMode="tel"
                pattern="\+?\d{10,15}"
                placeholder="Enter your phone number"
                required
                aria-invalid={!phoneOk(phoneNumber)}
                className="pl-10 h-11 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email address"
                required
                aria-invalid={!emailOk(Email)}
                className="pl-10 h-11 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            {/* Location (Cascading Selects) */}
            <LocationSelector value={location} onChange={setLocation} required />

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                required
                minLength={8}
                className="pl-10 pr-10 h-11 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                required
                className="pl-10 pr-10 h-11 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((s) => !s)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Agreement */}
            <div className="flex items-center space-x-3 pt-2">
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                required
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
                className="w-4 h-4 rounded border-2 border-border bg-card text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-colors"
              />
              <label htmlFor="agreement" className="text-sm text-muted-foreground leading-relaxed">
                I agree to the{" "}
                <span className="text-primary hover:underline cursor-pointer transition-colors">
                  terms &amp; conditions
                </span>
              </label>
            </div>

            {/* Register Button */}
            <Button
              type="button"
              onClick={handleRegisterClick}
              className="w-full h-12 bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] mt-8"
            >
              Create Account
            </Button>

            {/* Already have an account */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-primary hover:underline transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </form>
        </Card>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Register</h2>
              <p className="text-muted-foreground">Create your account to get started</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {/* Full Name */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  name="fullName"
                  value={Fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="pl-10 h-12 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  pattern="\+?\d{10,15}"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  required
                  className="pl-10 h-12 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email address"
                  required
                  aria-invalid={!emailOk(Email)}
                  className="pl-10 h-12 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              {/* Location (Cascading Selects) */}
              <LocationSelector value={location} onChange={setLocation} required />

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  minLength={8}
                  className="pl-10 pr-10 h-12 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={ConfirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="pl-10 pr-10 h-12 bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Agreement */}
              <div className="flex items-center space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="agreement_mobile"
                  name="agreement"
                  required
                  checked={agreement}
                  onChange={(e) => setAgreement(e.target.checked)}
                  className="w-4 h-4 rounded border-2 border-border bg-card text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-colors"
                />
                <label htmlFor="agreement_mobile" className="text-sm text-muted-foreground leading-relaxed">
                  I agree to the{" "}
                  <span className="text-primary hover:underline cursor-pointer transition-colors">
                    terms &amp; conditions
                  </span>
                </label>
              </div>

              {/* Register Button */}
              <Button
                type="button"
                onClick={handleRegisterClick}
                className="w-full h-12 bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] mt-8"
              >
                Create Account
              </Button>

              {/* Already have an account */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-primary hover:underline transition-colors font-medium">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
