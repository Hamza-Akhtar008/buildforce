import Image from 'next/image';

export interface Expert {
  id: string
  name: string
  location: string
  image: string
  badge: string
  projects: number
  hours: number
  attendanceRate: number
}

interface HireExpertsProps {
  experts: Expert[]
}

export function HireExperts({ experts }: HireExpertsProps) {
  return (
    <section className="w-full bg-[#161616] rounded-[42px] py-10 px-4">
      <div className="max-w-8xl mx-auto px-16">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-[64px]  text-white mb-9">
            Hire our <span className="text-[#CEA134]">Experts</span>
          </h2>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {experts.map((expert) => (
            <div key={expert.id} className="bg-[#222222] rounded-[32px] p-6 flex flex-col gap-4">
              {/* Profile Section */}
              <div className="flex items-center gap-4">
                <Image
                  src={expert.image || "/placeholder.svg"}
                  alt={expert.name}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="text-white font-semibold text-lg">{expert.name}</h3>
                  <p className="text-[#5A5A60] text-sm">{expert.location}</p>
                </div>
              </div>

              {/* Badge */}
              <div className="text-sm text-slate-300">
                {expert.badge.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>

              {/* Stats */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-sm bg-[#161616] p-3 rounded-lg">
                  <span className="text-[#FFFFFF]">Project</span>
                  <span className="text-white font-medium">{expert.projects}</span>
                </div>
                <div className="flex justify-between text-sm bg-[#161616] p-3 rounded-lg">
                  <span className="text-[#FFFFFF]">Hours</span>
                  <span className="text-white font-medium">{expert.hours}</span>
                </div>
                <div className="flex justify-between text-sm bg-[#161616] p-3 rounded-lg">
                  <span className="text-[#FFFFFF]">Attendance Rate</span>
                  <span className="text-white font-medium">{expert.attendanceRate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center">
          <button className="px-8 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-slate-950 transition-colors">
            View More
          </button>
        </div>
      </div>
    </section>
  )
}
