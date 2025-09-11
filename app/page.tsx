"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#222222] text-white items-center justify-center">
      <Card className="w-full max-w-md p-8 bg-[#333333] shadow-lg">
        {/* Logo at top */}
        <div className="flex justify-center mb-6">
          <img
            src="images/logo.png"
            alt="Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-gray-400">Sign in to your account to continue</p>
        </div>

        <form className="space-y-6">
          {/* Email */}
          <div className="flex items-center bg-white rounded px-3">
            <Mail className="text-gray-400 mr-2 h-5 w-5" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white rounded px-3 relative">
            <Lock className="text-gray-400 mr-2 h-5 w-5" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Remember me + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="accent-[#cb9c2c] rounded"
              />
              <span className="text-gray-400">Remember me</span>
            </label>
            <a href="#" className="text-[#cb9c2c] hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Sign in Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-[#cb9c2c] text-black font-semibold shadow-inner shadow-white/40 hover:bg-[#b58925]"
          >
            Sign in
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-[#cb9c2c] hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </Card>
    </div>
  )
}
