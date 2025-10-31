import React from 'react'
import Image from 'next/image'  
import {icon1,icon2,icon3,icon4,icon5} from "../../public/helperFile"

export default function Hero() {
  return (
    <div className='text-card p-17.5 bg-[#161616] rounded-4xl'>
      <div className='flex'>
        <div className='w-7/12'>
        <div className='flex flex-col gap-6'>

<div className='flex items-center gap-2.5 '>
  <span><Image src="/images/currentIcon.png" alt="Hero Image" width={15} height={15} /></span>
  <p className='text-sm tracking-widest'>CUSTOM SOLAR NOW AVAILABLE</p>
  </div>

  <div>
    <h1 className='text-6xl'>Sustainable Energy
      <br />
       for a Greener
       <br />  
      <span className='text-[#CEA134] font-semibold'> Tomorrow</span>
      </h1>
    </div>
    <div>
    <p className='#5A5A60 w-11/12 text-[#5A5A60] text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
    </div>
    <div className='flex gap-2'>
              <button className="bg-[#CEA134] text-white text-base px-10 py-2.5 rounded-[12px] ">
                Get in Touch
              </button>
       <button className="text-white text-base hover:text-gray-300 border-[1px] rounded-[12px] px-10 py-2.5">Request a Quote</button>
    </div>

    </div>       
    <div className='mt-25.5'>
      <p className='text-sm pb-6'>Trusted by <span className='text-[#CEA134]'>1,000+</span> companies and customers</p>
      <div className='flex gap-20'>
        {icon1}
        {icon2}
        {icon3}
        {icon4}
        {icon5}
      </div>
    </div>
    </div>
    
    <div className='relative w-5/12'>
    <div className='absolute -right-18 -top-26'>
    <Image src="/images/heroImage.svg" alt="Hero Image" width={50} height={50} className='scale-x-[-1] w-140'/>
    {/* Bottom blur overlay */}
  <div className="absolute bottom-0 left-0 w-full h-1/3 
                  bg-gradient-to-t from-[#161616] to-transparent 
                   rounded-b-[12px]">
  </div>
    </div>
    <div className='absolute -left-10 top-30'>
    <Image src="/images/reviewsImage.svg" alt="Reviews Image" width={50} height={50} className='w-70'/>
   
    </div>
    </div>
      </div>
     </div>
  )
}
