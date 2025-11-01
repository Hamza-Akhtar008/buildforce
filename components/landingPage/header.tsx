import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

interface MenuItem {
  label: string;
  href?: string;
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Contractors',
    subItems: [
      { label: 'Find Contractors', href: '/find-contractors' },
      { label: 'Become a Contractor', href: '/become-contractor' },
      { label: 'Contractor Services', href: '/contractor-services' }
    ]
  },

  {
    label: 'Labours',
    subItems: [
      { label: 'Find Jobs', href: '/job-board' },
      { label: 'Training', href: '/electrician-training' },
      { label: 'Certification', href: '/electrician-certification' }
    ]
  },
  {
    label: 'More',
    subItems: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Resources', href: '/resources' }
    ]
  }
];

export default function Header() {
  return (
    <div className='bg-[#161616] rounded-full py-5 px-10'>
        <div className='flex justify-between'>
            <div>
              <Link href="/">
                <Image src="/images/logo.png" alt="BuildForce Logo" width={50} height={47} className=''/>
              </Link>
            </div>
            <div>
                  <nav className="ml-10 flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <div key={index} className="relative group">
                  <button className="text-white text-base hover:text-gray-300 py-2 flex items-center gap-1">
                    {item.label}
                    {item.subItems && (
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>
                  {item.subItems && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        {item.subItems.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
            </div>
          
            <div className="space-x-3.5">
              <button className="text-white text-base hover:text-gray-300 border-[1px] rounded-[12px] px-10 py-3.5">Login</button>
              <button className="bg-[#CEA134] text-white text-base px-10 py-3.5 rounded-[12px] ">
                Sign Up
              </button>
            </div>
        </div>
    </div>
  )
}