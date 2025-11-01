export default function Sidebar() {
  const jobs = [
    {
      title: "Apprentice Electrician - Commercial",
      location: "Houston, TX 77070 US",
      pay: "$40 - Midlevel",
      experience: "+ Experience",
    },
    {
      title: "Apprentice Electrician - Commercial",
      location: "Houston, TX 77070 US",
      pay: "$40 - Midlevel",
      experience: "+ Experience",
    },
    {
      title: "Apprentice Electrician - Commercial",
      location: "Houston, TX 77070 US",
      pay: "$40 - Midlevel",
      experience: "+ Experience",
    },
    {
      title: "Apprentice Electrician - Commercial",
      location: "Houston, TX 77070 US",
      pay: "$40 - Midlevel",
      experience: "+ Experience",
    },
  ]

  return (
    <div className="max-w-2xl bg-[#161616] rounded-[42px] py-20 px-4 max-h-[1200px] overflow-y-auto">
      <h2 className="mb-8 text-xl font-semibold">Search Jobs</h2>

      {/* Project Duration */}
      <div className="mb-8">
        <label className="mb-4 block text-sm font-semibold text-gray-300">Estimated project duration</label>
        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="duration" className="accent-yellow-600" />
            <span className="text-sm">1-2 months</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="duration" className="accent-yellow-600" />
            <span className="text-sm">3-6 months</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="duration" className="accent-yellow-600" />
            <span className="text-sm">6+ months</span>
          </label>
        </div>
      </div>

      {/* Minimum Pay Rate */}
      <div className="mb-8 ">
        <label className="mb-2 block text-sm font-semibold text-[gray]-300">Minimum pay rate</label>
        <input
          type="text"
          placeholder="$"
          className="w-[100px] bg-[#2F2F2F] rounded-[99px] border border-gray-700 px-3 py-2 text-sm text-gray-400 placeholder-gray-600"
        />
      </div>

      {/* Region and County */}
      <div className="mb-8 flex gap-2">
        <select className="flex-1 bg-[#2F2F2F] rounded-[99px] border border-gray-700 px-2 py-2 text-sm text-gray-300">
          <option>Region</option>
        </select>
        <select className="flex-1 bg-[#2F2F2F] rounded-[99px] border border-gray-700 px-2 py-2 text-sm text-gray-300">
          <option>County</option>
        </select>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {jobs.map((job, idx) => (
          <div
            key={idx}
            className=" border border-gray-700 bg-[#2F2F2F] rounded-[22px] p-3 hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <h4 className="mb-2 text-sm font-semibold text-[#CEA134]">{job.title}</h4>
            <div className="space-y-1 text-xs text-gray-400">
              <p>{job.location}</p>
              <p>{job.pay}</p>
              <p>{job.experience}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
