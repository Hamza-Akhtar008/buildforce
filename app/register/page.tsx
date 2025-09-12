import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { User, Phone, MapPin, Lock, Link as LinkIcon } from "lucide-react"

import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen bg-[#222222] text-white">
      {/* Left Section - Logo */}
      <div className="flex items-center justify-center w-1/2">
        <img
          src="images/logo.png"
          alt="Logo"
          className="w-48 h-48 object-contain"
        />
      </div>

      {/* Right Section - Form */}
      <div className="flex items-center justify-center w-3/4">
        <Card className="w-full max-w-2xl p-8 bg-[#333333] shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form className="space-y-4">
            {/* Full Name */}
            <div className="flex items-center bg-white rounded px-3">
              <User className="text-gray-400 mr-2 h-5 w-5" />
              <Input
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-400"
              />
            </div>

            {/* Phone */}
            <div className="flex items-center bg-white rounded px-3">
              <Phone className="text-gray-400 mr-2 h-5 w-5" />
              <Input
                type="tel"
                placeholder="Phone"
                required
                className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-400"
              />
            </div>

            {/* Location */}
            <div className="flex items-center bg-white rounded px-3">
              <MapPin className="mr-2 h-5 w-5" style={{ color: "#be932d" }} />
              <Input
                type="text"
                placeholder="Location"
                required
                className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-400"
              />
            </div>

            {/* Password */}
            <div className="flex items-center bg-white px-3">
              <Lock className="text-gray-400 mr-2 h-5 w-5" />
              <Input
                type="password"
                placeholder="Password"
                required
                className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-400"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex items-center bg-white rounded px-3">
              <Lock className="text-gray-400 mr-2 h-5 w-5" />
              <Input
                type="password"
                placeholder="Confirm Password"
                required
                className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-400"
              />
            </div>

            {/* Agreement */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="agreement" className="accent-[#cb9c2c]" />
              <label htmlFor="agreement" className="text-sm">
                I agree to the terms & conditions
              </label>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              className="w-full bg-[#cb9c2c] text-black font-semibold shadow-inner shadow-white/40 hover:bg-[#b58925]"
            >
              Register
            </Button>

            {/* Already have an account */}
            <p className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{" "}

              <Link href="/" className="text-[#cb9c2c] hover:underline">
                Login
              </Link>

            </p>
          </form>
        </Card>
      </div>
    </div>
  )
}
