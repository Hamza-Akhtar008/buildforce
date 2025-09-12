import React from 'react'
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Settings, BarChart2, Shield, Zap, FolderOpen } from "lucide-react";

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

const AdminCards = () => {
	const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);
	return (
		<div className="w-full max-w-2xl mx-auto flex-shrink-0">
			<div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
				{adminSections.map((section, idx) => {
					const IconComponent = section.icon;
					const isHovered = hoveredCard === idx;
					return (
						<Link href={section.link} key={idx} className="block">
							<Card
								className={`cursor-pointer transition-all duration-200 border-none shadow-lg rounded-xl flex items-center justify-center h-32 ${
									isHovered ? 'bg-primary scale-105' : 'bg-card'
								}`}
								onMouseEnter={() => setHoveredCard(idx)}
								onMouseLeave={() => setHoveredCard(null)}
							>
								<CardContent className="flex items-center justify-center h-full p-6">
									<IconComponent
										className={`mr-3 h-7 w-7 ${
											isHovered ? 'text-primary-foreground' : 'text-primary'
										}`}
									/>
									<span
										className={`font-semibold text-base text-center whitespace-nowrap ${
											isHovered ? 'text-primary-foreground' : 'text-foreground'
										}`}
									>
										{section.title}
									</span>
								</CardContent>
							</Card>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default AdminCards
