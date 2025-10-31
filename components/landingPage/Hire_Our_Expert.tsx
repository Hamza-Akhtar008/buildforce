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
    <section className="w-full bg-[#161616] rounded-[42px] py-20 px-4">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-[64px]  text-white mb-2">
            Hire our <span className="text-[#CEA134]">Experts</span>
          </h2>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {experts.map((expert) => (
            <div key={expert.id} className="bg-[#222222] rounded-[32px] p-6 flex flex-col gap-4">
              {/* Profile Section */}
              <div className="flex items-center gap-4">
                <img
                  src={expert.image || "/placeholder.svg"}
                  alt={expert.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-white font-semibold text-lg">{expert.name}</h3>
                  <p className="text-slate-400 text-sm">{expert.location}</p>
                </div>
              </div>

              {/* Badge */}
              <div className="text-sm text-slate-300">
                <p>{expert.badge}</p>
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
