"use client"

import type React from "react"

import { useState } from "react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section className="w-full bg-[#161616] rounded-3xl p-8 md:p-10 lg:p-12 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 text-white">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold">Join our Mailing list</h2>
           <svg width="52" height="60" viewBox="0 0 52 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.9808 0L27.1658 27.9475L51.9615 15L28.3508 30L51.9615 45L27.1658 32.0525L25.9808 60L24.7958 32.0525L1.14441e-05 45L23.6108 30L1.14441e-05 15L24.7958 27.9475L25.9808 0Z" fill="#CEA134"/>
</svg>

          </div>

          <p className="text-gray-400 text-lg mb-8">Subscribe for the latest real estate news and insights</p>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="flex gap-0 rounded-full bg-slate-800 border border-slate-700 p-1">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-transparent px-6 py-3 text-white placeholder-gray-500 outline-none"
            />
            <button
              type="submit"
              className="bg-[#CEA134] hover:bg-[#CEA138] text-slate-900 font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Submit
            </button>
          </form>

          {submitted && <p className="text-amber-500 text-sm mt-4">Thank you for subscribing!</p>}
        </div>

        {/* Right Crane Illustration */}
        <div className="flex-1 flex justify-center">
            <img src="/images/Newletter.png" alt="Newsletter Crane Illustration" className="max-w-full h-auto" />
        </div>
      </div>
    </section>
  )
}
