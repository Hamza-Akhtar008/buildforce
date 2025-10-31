import Image from "next/image"

export function ManageField() {
  const features = [
    {
      icon: "🏢",
      title: "Buildforce Integration",
      description: "We streamline worker onboarding and time tracking through the popular Buildforce app",
    },
    {
      icon: "▶️",
      title: "Real-time Tracking",
      description: "Always know what projects your workers are on and if they're on-site",
    },
    {
      icon: "✓",
      title: "Compliance Management",
      description: "Maintain field compliance – daily verified TDLR and other certifications",
    },
    {
      icon: "→",
      title: "Worker Management",
      description: "Easily transfer or let go of workers – we handle the communication and the rest from there",
    },
  ]

  return (
    <section className="w-full bg-[#161616] py-20 rounded-[42px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4">
            Manage the <span className="text-amber-400 font-normal">field</span> with ease
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            We streamline worker onboarding and time tracking through the popular Buildforce app
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Features */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-600 text-white text-lg">
                    {index === 0 && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4l2-3h2l2 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"
                        />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {index === 3 && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
             <div className="relative inline-block w-[300px] md:w-[400px] lg:w-[450px]">
  {/* Offset amber frame */}
  <div className="absolute -left-8 -top-4 w-full h-full rounded-3xl border-2 border-amber-400 shadow-2xl"></div>

  {/* Actual image */}
  <Image
    src="/images/Fileds.png"
    alt="Construction workers collaborating on laptop"
    width={700}
    height={800}
    className="relative w-full h-auto object-cover rounded-3xl"
    priority
  />
</div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
