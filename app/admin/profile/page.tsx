'use client'
import AdminCards from '@/components/adminComponent/adminCards'
import MyProfile from '@/components/userComponent/MyProfile'
import React from 'react'

const page = () => {
  return (
    <div>
      <MyProfile />
      <AdminCards/>
    </div>
  )
}

export default page
