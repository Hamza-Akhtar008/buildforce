import React from 'react'
import Image from 'next/image'
import {linkedinIcon,fbIcon,instaIcon} from "../../public/helperFile"

export default function Footer() {
  const footerLists = [
    {
      title: "Resources",
      items: [
        "Law Solutions",
        "Workplace Policy",
        "HR Advisory",
        "Employee Handbooks"
      ]
    },
    {
      title: "Platform",
      items: [
        "Law Solutions",
        "Workplace Policy",
        "HR Advisory",
        "Employee Handbooks"
      ]
    },
    {
      title: "Resources",
      items: [
        "Articles",
        "Documentation",
        "Tutorials",
        "Help Center"
      ]
    },
    {
      title: "Company",
      items: [
        "Law Solutions",
        "Workplace Policy",
        "HR Advisory",
        "Employee Handbooks"
      ]
    }
  ];



  return (
    <div className='py-17.5 px-20'>
      <div className='text-card'>
        <div className='flex gap-6 items-center'>
          <Image src="/images/logo.png" alt="BuildForce Logo" width={50} height={47} className=''/>
          <span className='text-3xl font-thin'>|</span>
        {linkedinIcon}
        {fbIcon}
        {instaIcon}
        </div>
      </div>


<div className='grid grid-cols-4 gap-8 mt-14'>
          {footerLists.map((list, index) => (
            <div key={index} className='text-white'>
              <h3 className='text-base font-medium mb-8'>{list.title}</h3>
              <ul className='space-y-6'>
                {list.items.map((item, itemIndex) => (
                  <li key={itemIndex} className='text-[#49505B] hover:text-[#CEA134] cursor-pointer text-sm'>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        
        {/* bottom footer */}
        <div className='flex flex-col gap-2'>
            <p className='text-[#49505B] pt-20'>Brisbane, AU 09:45</p>
            <div className='border-[1px] border-card'></div>
            <div className='flex text-[#49505B] justify-between items-center'>
                <div className='flex text-[49505B] gap-4'>
                <p>Terms & Conditions</p>
                <p>Privacy Policy</p>
                </div>
                <p>©2025; All Rights Reserved - Build Force</p>

            </div>
        </div>
      </div>
  )
}
