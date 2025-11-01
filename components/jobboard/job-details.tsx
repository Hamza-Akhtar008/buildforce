"use client"

export default function JobDetails() {
  const weekDays = ["SU", "M", "T", "W", "Th", "F", "SA"]

  return (
    <div className="flex-1 bg-[#161616] rounded-[42px] ml-5 overflow-y-auto p-8">
      {/* Job Header */}
      <div className="mb-10">
        <h1 className="mb-2 text-4xl font-semibold">Apprentice Electrician - Commercial</h1>
        <p className="text-gray-400">Houston, TX 77070 - Hiring 10 Workers</p>
        <p className="text-sm text-gray-500">Posted on Oct 30, 2025</p>
      </div>

      {/* Job Details Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Job Details</h2>
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 font-semibold text-gray-300">Duration</h3>
            <p className="text-gray-400">6+ months duration</p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-gray-300">Start Date</h3>
            <p className="text-gray-400">Job starts as soon as Nov 10, 2025</p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-gray-300">Hours</h3>
            <p className="text-gray-400">36-50hr</p>
            <p className="text-sm text-gray-500">Depending on experience</p>
          </div>
        </div>
      </section>

      {/* Job Schedule Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Job Schedule</h2>
        <div className="flex gap-3 mb-4">
          {weekDays.map((day) => (
            <div
              key={day}
              className="w-10 h-10 flex items-center justify-center border border-gray-600 text-sm font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {day}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500">6am - 4pm Shifts</p>
        <p className="text-sm text-gray-500">Times are subject to change</p>
      </section>

      {/* Location Section */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Location</h2>
        <p className="text-gray-400">Houston, TX 77070 US</p>
      </section>

      {/* Requirements Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Requirements</h2>

        <div className="mb-6">
          <h3 className="mb-3 font-semibold text-gray-300">Experience</h3>
          <div className="inline-block">
            <span className="px-4 py-2 border border-gray-600 rounded-full text-sm text-gray-300">Commercial</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 font-semibold text-gray-300">Licenses</h3>
          <div className="inline-block">
            <span className="px-4 py-2 border border-gray-600 rounded-full text-sm text-gray-300">
              TDLR - Apprentice Electrician
            </span>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-gray-300">Skills</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-2 border border-gray-600 rounded-full text-sm text-gray-300">Bending Conduit</span>
            <span className="px-4 py-2 border border-gray-600 rounded-full text-sm text-gray-300">Rough In</span>
            <span className="px-4 py-2 border border-gray-600 rounded-full text-sm text-gray-300">
              Equipment Tie-Ins
            </span>
            <span className="px-4 py-2 border border-gray-600 rounded-full text-sm text-gray-300">System Testing</span>
            <span className="px-4 py-2 border border-gray-600 rounded-full text-sm text-gray-300">Devices</span>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Benefits</h2>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 border border-gray-600 rounded-full text-sm text-gray-300">Flexible Schedule</span>
          <span className="px-4 py-2 border border-gray-600 rounded-full text-sm text-gray-300">Health Insurance</span>
          <span className="px-4 py-2 border border-gray-600 rounded-full text-sm text-gray-300">Referral Program</span>
        </div>
      </section>

      {/* Description Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Description</h2>
        <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
          <p>
            Buildforce offers Electricians real job security and higher pay. We partner with electrical contractors to
            provide you with hundreds of opportunities to choose from.
          </p>
          <p>
            We are looking for a Commercial Journeyman Electrician who has 5 years of Commercial experience. 6 story
            Core and shell garage/office with high end finishes.
          </p>
          <div className="border-t border-gray-700 pt-4 mt-4">
            <p className="font-semibold text-gray-300 mb-3">
              Electricians working for Buildforce check the following boxes:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Have 5 years Commercial/Electrician experience (required)</li>
              <li>Valid Journeyman TDLR license (required)</li>
              <li>MUST have own tools</li>
              <li>MUST have reliable transportation</li>
              <li>Ability to pass a background check</li>
            </ul>
          </div>
          <div className="border-t border-gray-700 pt-4 mt-4">
            <p className="font-semibold text-gray-300 mb-3">
              Here's why Buildforce is the best and fastest-growing employer for commercial electricians across Texas:
            </p>
            <ul className="space-y-3 list-disc list-inside">
              <li>
                <strong>Competitive Pay:</strong> Our pay aligns above industry average depending on your experience.
              </li>
              <li>
                <strong>Job Security:</strong> This is our specialty. When your project ends, you can either take a
                break and come back later or get started on a new project the next day. It's your choice.
              </li>
              <li>
                <strong>Respect:</strong> We respect the time and work hard and want it, you'll get it. If you don't,
                you can work 50 each week. It's up to you.
              </li>
              <li>
                <strong>Benefits:</strong> Medical Insurance, Referral Perks, Holiday Pay, and full Support Team ready
                to help you out!
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="mb-8">
        <p className="text-gray-400 text-sm mb-6">
          Apply to this job to meet your next talent manager and join the fastest growing employer of electricians in
          Texas. Se habla español!
        </p>
        <p className="text-gray-500 text-xs mb-3">
          Download our Buildforce app to really get a head start on your career with us!
        </p>
        <button className="w-full bg-[#CEA134] rounded-[12px] text-black font-semibold py-3 text-lg hover:bg-yellow-500 transition-colors">
          Get In Touch
        </button>
      </div>
    </div>
  )
}
