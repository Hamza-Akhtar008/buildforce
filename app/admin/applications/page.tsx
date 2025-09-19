"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";

const dummyApplications = [
	{
		id: 1,
		name: "John Doe",
		image: "https://randomuser.me/api/portraits/men/12.jpg",
		role: "Full Stack Developer",
		email: "john.doe@email.com",
		phone: "+1 555-1234",
		coverLetter:
			"I am passionate about construction and have 5 years experience as a site engineer.",
		status: "pending",
	},
	{
		id: 2,
		name: "Jane Smith",
		image: "https://randomuser.me/api/portraits/women/13.jpg",
		role: "Architect",
		email: "jane.smith@email.com",
		phone: "+1 555-5678",
		coverLetter:
			"My background in architecture and teamwork makes me a great fit for your projects.",
		status: "pending",
	},
	{
		id: 3,
		name: "Mike Brown",
		image: "https://randomuser.me/api/portraits/men/77.jpg",
		role: "Engineer",
		email: "mike.brown@email.com",
		phone: "+1 555-8765",
		coverLetter:
			"Experienced supervisor, ready to contribute and lead teams efficiently.",
		status: "interviewed",
	},
	{
		id: 4,
		name: "Emily Clark",
		image: "https://randomuser.me/api/portraits/women/78.jpg",
		role: "Technician",
		email: "emily.clark@email.com",
		phone: "+1 555-4321",
		coverLetter:
			"Skilled technician with a strong record in healthcare construction.",
		status: "pending",
	},
	{
		id: 5,
		name: "John Doe",
		image: "https://randomuser.me/api/portraits/men/12.jpg",
		role: "Full Stack Developer",
		email: "john.doe@email.com",
		phone: "+1 555-1234",
		coverLetter:
			"Repeat: I am passionate about construction and have 5 years experience as a site engineer.",
		status: "interviewed",
	},
	{
		id: 6,
		name: "Jane Smith",
		image: "https://randomuser.me/api/portraits/women/13.jpg",
		role: "Architect",
		email: "jane.smith@email.com",
		phone: "+1 555-5678",
		coverLetter:
			"Repeat: My background in architecture and teamwork makes me a great fit for your projects.",
		status: "pending",
	},
];

const statusColors: Record<string, string> = {
	pending: "bg-yellow-500/10 text-yellow-500",
	interviewed: "bg-blue-500/10 text-blue-500",
	offered: "bg-green-500/10 text-green-500",
	rejected: "bg-red-500/10 text-red-500",
	hired: "bg-green-500/10 text-green-500",
};

const statusOrder = [
	{ key: "pending", label: "Pending" },
	{ key: "interviewed", label: "Interviewed" },
	{ key: "hired", label: "Hired" },
	{ key: "rejected", label: "Rejected" },
];

const page = () => {
	const [applications, setApplications] = useState(dummyApplications);
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	const handleStatus = (id: number, newStatus: string) => {
		setApplications((applications) =>
			applications.map((app) =>
				app.id === id ? { ...app, status: newStatus } : app
			)
		);
	};

	const filteredApplications = applications.filter(
		(app) =>
			(search === "" ||
				app.name.toLowerCase().includes(search.toLowerCase()) ||
				app.role.toLowerCase().includes(search.toLowerCase()) ||
				app.email.toLowerCase().includes(search.toLowerCase())) &&
			(statusFilter === "all" || app.status === statusFilter)
	);

	return (
		<div className="container max-w-6xl py-10">
			<Card className="border-none bg-background/60 shadow-md backdrop-blur-lg">
				<CardHeader>
					<CardTitle className="text-3xl font-bold tracking-tight">
						Employment Applications
					</CardTitle>
					<div className="mt-4 flex gap-4 items-center flex-wrap">
						<Input
							placeholder="Search by name, role, or email..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="max-w-md"
						/>
						<Select
							value={statusFilter}
							onValueChange={setStatusFilter}
						>
							<SelectTrigger className="max-w-xs min-w-[150px]">
								<SelectValue placeholder="Filter by status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Statuses</SelectItem>
								{statusOrder.map((status) => (
									<SelectItem key={status.key} value={status.key}>
										{status.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</CardHeader>
				<CardContent className="p-6">
					{filteredApplications.length === 0 ? (
						<div className="text-center py-8 text-muted-foreground">
							No applications found.
						</div>
					) : (
						<div className="flex flex-col gap-6">
							{filteredApplications.map((app) => (
								<div
									key={app.id}
									className="flex items-center gap-6 bg-card rounded-lg p-5 shadow-sm border"
								>
									<img
										src={app.image}
										alt={app.name}
										className="w-20 h-20 rounded-full object-cover border-2 border-primary"
									/>
									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between">
											<h3 className="text-lg font-semibold text-foreground/90 truncate">
												{app.name}
											</h3>
											<span
												className={
													"px-3 py-1 rounded-full text-xs font-medium w-fit " +
													statusColors[app.status]
												}
											>
												{app.status.charAt(0).toUpperCase() +
													app.status.slice(1)}
											</span>
										</div>
										<div className="mt-1 flex flex-wrap gap-4 text-sm text-muted-foreground">
											<span className="font-medium">Role:</span>
											<span className="text-foreground">
												{app.role}
											</span>
											<span className="font-medium">Email:</span>
											<span>{app.email}</span>
											<span className="font-medium">Phone:</span>
											<span>{app.phone}</span>
										</div>
										<div className="mt-2 text-sm text-muted-foreground">
											<span className="font-medium">Cover Letter:</span>
											<p className="mt-1 line-clamp-3">
												{app.coverLetter}
											</p>
										</div>
										<div className="mt-4 flex gap-2 flex-wrap">
											{app.status === "pending" && (
												<>
													<Button
														variant="outline"
														size="sm"
														className="hover:bg-primary/10 hover:text-primary transition"
														onClick={() =>
															handleStatus(app.id, "interviewed")
														}
													>
														Call for Interview
													</Button>
													<Button
														variant="destructive"
														size="sm"
														className="hover:bg-red-500/10 hover:scale-105 transition"
														onClick={() =>
															handleStatus(app.id, "rejected")
														}
													>
														Reject
													</Button>
												</>
											)}
											{app.status === "interviewed" && (
												<>
													<Button
														variant="default"
														size="sm"
														className="hover:bg-green-500/10 hover:text-green-600 transition"
														onClick={() =>
															handleStatus(app.id, "hired")
														}
													>
														Send Offer
													</Button>
													<Button
														variant="destructive"
														size="sm"
														className="hover:bg-red-500/10 hover:text-black transition"
														onClick={() =>
															handleStatus(app.id, "rejected")
														}
													>
														Reject
													</Button>
												</>
											)}
											{app.status === "hired" && (
												<span className="text-green-600 font-semibold">
													Offer Sent
												</span>
											)}
											{app.status === "rejected" && (
												<span className="text-white-600 font-semibold">
													Rejected
												</span>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default page;
