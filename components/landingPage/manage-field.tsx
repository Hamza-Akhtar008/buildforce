import Image from "next/image"


export function ManageField() {
  const features = [
    {
      icon: "/images/speedIcon.svg",
      title: "Buildforce Integration",
      description: "We streamline worker onboarding and time tracking through the popular Buildforce app",
    },
    {
      icon: "/images/playIcon.svg",
      title: "Real-time Tracking",
      description: "Always know what projects your workers are on and if they're on-site",
    },
    {
      icon: "/images/tdlrIcon.svg",
      title: "Compliance Management",
      description: "Maintain field compliance – daily verified TDLR and other certifications",
    },
    {
      icon: "/images/personIcon.svg",
      title: "Worker Management",
      description: "Easily transfer or let go of workers – we handle the communication and the rest from there",
    },
  ]

  return (
    <section className="w-full bg-[#161616] py-20 rounded-[42px] px-4 sm:px-6 lg:px-16">
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
          <div className="space-y-8 pl-11">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 text-white text-lg">
                    {feature.icon.startsWith('/') ? (
                      <Image 
                        src={feature.icon}
                        alt={feature.title}
                        width={24}
                        height={24}
                        className="w-10 h-10"
                      />
                    ) : (
                      <span className="text-xl">{feature.icon}</span>
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
  <div className="absolute -left-8 -top-4 w-full h-full rounded-3xl border-[1px] border-[#CEA134]"></div>

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
