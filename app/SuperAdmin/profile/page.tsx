'use client'
import AdminCards from '@/components/adminComponent/adminCards'
import MyProfile from '@/components/userComponent/MyProfile'
import { Lock, Settings, BarChart2, Shield, Zap, FolderOpen } from "lucide-react";
import React from 'react'
const adminSections = [
	{
		title: "Security",
		icon: Lock,
		link: "/admin/security"
	},
	{
		title: "Admin Preferences",
		icon: Settings,
		link: "/admin/preferences"
	},
	{
		title: "System Overview ",
		icon: BarChart2,
		link: "/admin/system-overview"
	},
	{
		title: "Access & Permissions",
		icon: Shield,
		link: "/admin/access-permissions"
	},
	{
		title: "Project Management",
		icon: FolderOpen,
		link: "/admin/project-management"
	},
	{
		title: "Difference:",
		icon: Zap,
		link: "/admin/difference"
	}
];
const page = () => {
  return (
    <div>
      <MyProfile />
      <AdminCards sections={adminSections}/>
    </div>
  )
}

export default page
