import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Jennifer Mendy",
      text: "Skyline made finding my dream home so easy and stress-free! The platform's intuitive design and powerful search filters helped me narrow down my options quickly.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      rating: 4.5,
    },
    {
      id: 2,
      name: "John Walker",
      text: "As a real estate agent, Skyline has completely transformed the way I manage my listings and interactions.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Sharon Lee",
      text: "As a real estate agent, Skyline has completely transformed the way I manage my listings and interactions.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      rating: 4.5,
    },
    {
      id: 4,
      name: "Stifler Monroe",
      text: "Skyline made finding my dream home so easy and stress-free! The platform's intuitive design and powerful search filters helped me narrow down my options quickly.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      rating: 4.5,
    },
  ]

  const renderCard = (testimonial: any) => (
    <div
      key={testimonial.id}
      className="relative bg-[#222222] rounded-2xl p-8 pt-14 border border-[#222222] shadow-xl w-full h-full"
    >
      {/* Floating Profile Image */}
      <div className="absolute -top-10 left-8">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-20 h-20 rounded-full object-cover border-4 border-[#222222] shadow-lg"
        />
      </div>

      {/* Testimonial Text */}
      <p className="text-slate-300 text-base leading-relaxed mb-6">
        {testimonial.text}
      </p>

      {/* Name + Rating */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold text-lg">{testimonial.name}</h3>
          <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={
                  i < Math.floor(testimonial.rating)
                    ? "fill-[#CEA134] text-[#CEA134]"
                    : i < testimonial.rating
                    ? "fill-[#CEA134] text-[#CEA134]"
                    : "text-slate-600"
                }
              />
            ))}
          </div>
        </div>

        {/* Quote Icon */}
        <svg
          width="53"
          height="45"
          viewBox="0 0 53 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.75 45H48.75C49.7446 45 50.6984 44.6049 51.4016 43.9016C52.1049 43.1984 52.5 42.2446 52.5 41.25V26.25C52.5 25.2554 52.1049 24.3016 51.4016 23.5984C50.6984 22.8951 49.7446 22.5 48.75 22.5H37.5C37.5 14.2275 44.2275 7.5 52.5 7.5V0C40.0913 0 30 10.0912 30 22.5V41.25C30 42.2446 30.3951 43.1984 31.0984 43.9016C31.8016 44.6049 32.7554 45 33.75 45ZM3.75 45H18.75C19.7446 45 20.6984 44.6049 21.4016 43.9016C22.1049 43.1984 22.5 42.2446 22.5 41.25V26.25C22.5 25.2554 22.1049 24.3016 21.4016 23.5984C20.6984 22.8951 19.7446 22.5 18.75 22.5H7.5C7.5 14.2275 14.2275 7.5 22.5 7.5V0C10.0912 0 0 10.0912 0 22.5V41.25C0 42.2446 0.395088 43.1984 1.09835 43.9016C1.80161 44.6049 2.75544 45 3.75 45Z"
            fill="white"
            fillOpacity="0.1"
          />
        </svg>
      </div>
    </div>
  )

  return (
    <section className="w-full bg-[#161616] rounded-[42px] py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-normal text-center mb-25.5 text-white">
          Nothing compares to{" "}
          <span className="text-[#CEA134]">Buildforce</span>
        </h2>

        {/* Grid Rows */}
        <div className="flex flex-col gap-8">
          {/* Row 1 — grid-cols-[2fr_1fr] */}
          <div className="grid grid-cols-[2fr_1fr] gap-16 mb-6">
            {renderCard(testimonials[0])}
            {renderCard(testimonials[1])}
          </div>

          {/* Row 2 — grid-cols-[1fr_2fr] */}
          <div className="grid grid-cols-[1fr_2fr] gap-16">
            {renderCard(testimonials[2])}
            {renderCard(testimonials[3])}
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-16">
          <button className="px-8 py-3 border-2 border-slate-400 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors">
            See more Success Story
          </button>
        </div>
      </div>
    </section>
  )
}
