export function StatsBanner() {
  return (
    <div className="relative w-full max-w-8xl mx-auto">
      {/* Main banner container */}
      <div className="relative bg-[#CEA134] rounded-3xl px-8 py-12 overflow-hidden">
        {/* Decorative curved element - top left */}
        <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full border-2 border-[#FFFFFF]" />

        {/* Decorative curved element - bottom right */}
        <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full border-2 border-[#FFFFFF]" />

        {/* Content container */}
        <div className="relative z-10 flex items-center justify-around">
          {/* Stat 1 */}
          <div className="text-center">
            <h1 className="font-poppins font-normal text-[64px] leading-[72px] tracking-[-1.8px] text-center">
  50K+
</h1>
            <div className="text-lg text-white/90">Constructed</div>
          </div>

          {/* Divider */}
          <div className="h-20 w-px bg-white/30" />

          {/* Stat 2 */}
          <div className="text-center">
                  <h1 className="font-poppins font-normal text-[64px] leading-[72px] tracking-[-1.8px] text-center">
  250K+
</h1>
           
            <div className="text-lg text-white/90">Builders</div>
          </div>

          {/* Divider */}
          <div className="h-20 w-px bg-white/30" />

          {/* Stat 3 */}
          <div className="text-center">
                  <h1 className="font-poppins font-normal text-[64px] leading-[72px] tracking-[-1.8px] text-center">
  70K+
</h1>
     
            <div className="text-lg text-white/90">Companies</div>
          </div>
        </div>
      </div>
    </div>
  )
}
