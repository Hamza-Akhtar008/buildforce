"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "Does Skyline verify listed properties?",
    answer:
      "Yes, all properties undergo a thorough verification process to ensure accuracy, legality, and quality before being listed",
  },
  {
    question: "What services does Skyline offer?",
    answer:
      "Skyline offers comprehensive real estate services including property verification, listing management, legal assistance, and expert consultation for buyers and sellers.",
  },
  {
    question: "How can I search for properties?",
    answer:
      "You can search for properties using our intuitive search filters, advanced property search tools, and personalized recommendations based on your preferences.",
  },
  {
    question: "Does Skyline provide legal assistance?",
    answer:
      "Yes, Skyline provides comprehensive legal assistance and guidance throughout the property transaction process to ensure all legal requirements are met.",
  },
]

export function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState(0)

  return (
    <section className="bg-[#161616] rounded-3xl py-10 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side */}
        <div className="flex flex-col justify-start">
          <div className="relative mb-6">
            {/* <div className="absolute -top-8 left-0 text-amber-500 text-2xl">✦</div> */}
            <h2 className="text-4xl lg:text-5xl font-light text-white">Top questions</h2>
            <p className="text-4xl lg:text-5xl font-light italic text-white mt-2 font-['Playfair_Display']">Answered</p>
          </div>

          <p className="text-gray-400 text-lg mb-8">
            See how we've turned clients' real estate dreams into reality with exceptional service
          </p>

          <button className="w-fit px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-slate-900 transition-colors duration-200">
            Ask a Question
          </button>
        </div>

        {/* Right Side - FAQ */}
        <div className="space-y-4">
            <svg width="52" height="60" viewBox="0 0 52 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.9808 0L27.1658 27.9475L51.9615 15L28.3508 30L51.9615 45L27.1658 32.0525L25.9808 60L24.7958 32.0525L1.14441e-05 45L23.6108 30L1.14441e-05 15L24.7958 27.9475L25.9808 0Z" fill="#CEA134"/>
</svg>

          {faqItems.map((item, index) => (
            <div key={index} className="bg-[#161616] rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700 transition-colors duration-200"
              >
                <h3 className="text-lg font-medium text-white text-left">{item.question}</h3>
                <div className="flex-shrink-0 ml-4">
                  {expandedIndex === index ? (
                    <Minus className="w-6 h-6 text-white bg-[#CEA134] rounded-full" />
                  ) : (
                    <Plus className="w-6 h-6 text-amber-500" />
                  )}
                </div>
              </button>

              {expandedIndex === index && (
                <div className="px-6 py-4 bg-slate-750 border-t border-slate-700">
                  <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
