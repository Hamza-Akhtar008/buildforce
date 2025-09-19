"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const dummyProjects = [
  {
    id: "1",
    name: "Downtown Office Complex",
    location: "New York",
    type: "Local",
    startDate: "2024-06-01",
    endDate: "2024-12-15",
    manager: "Sarah Wilson",
    description: "Renovation of the downtown office complex.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0IenQmRn3ql2vRGGhpNzmz1QYW2PWMSQY_w&s",
    employees: [
      {
        name: "John Doe",
        role: "Engineer",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        name: "Jane Smith",
        role: "Architect",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        name: "Mike Brown",
        role: "Supervisor",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
      },
    ],
    applications: [
      { name: "Alice Johnson", role: "Worker" },
      { name: "Bob Lee", role: "Electrician" },
      { name: "Chris Evans", role: "Plumber" },
      { name: "Diana Prince", role: "Foreman" },
      { name: "Ethan Hunt", role: "Technician" },
    ],
    status: "progress",
  },
  {
    id: "2",
    name: "Residential Tower A",
    location: "Chicago",
    type: "International",
    startDate: "2024-07-10",
    endDate: "2025-01-20",
    manager: "Mike Wilson",
    description: "Construction of a new residential tower.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3fQSZEIoZPz36sWHuK9mSDR9vH1C2KeAt-Q&s",
    employees: [
      {
        name: "Emily Clark",
        role: "Engineer",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      {
        name: "David Kim",
        role: "Supervisor",
        image: "https://randomuser.me/api/portraits/men/66.jpg",
      },
    ],
    applications: [
      { name: "Frank Miller", role: "Worker" },
      { name: "Grace Lee", role: "Technician" },
      { name: "Helen Carter", role: "Foreman" },
      { name: "Ian Wright", role: "Electrician" },
      { name: "Jack Black", role: "Plumber" },
      { name: "Karen White", role: "Worker" },
      { name: "Leo Messi", role: "Technician" },
      { name: "Mona Lisa", role: "Worker" },
    ],
    status: "pending",
  },
  {
    id: "3",
    name: "Shopping Mall Plaza",
    location: "Los Angeles",
    type: "Local",
    startDate: "2024-08-15",
    endDate: "2025-03-30",
    manager: "Emily Brown",
    description:
      "Development of modern shopping complex with entertainment facilities.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQewZkYLIYd9QiQ8OX-9nYyr6EFPv2rH1W1eA&s",
    employees: 15,
    applications: 3,
    status: "completed",
    users: [
      "https://randomuser.me/api/portraits/men/12.jpg",
      "https://randomuser.me/api/portraits/women/13.jpg",
    ],
  },
  {
    id: "4",
    name: "Green Energy Park",
    location: "Seattle",
    type: "Sustainable",
    startDate: "2024-09-01",
    endDate: "2025-06-15",
    manager: "David Chen",
    description: "Construction of solar and wind energy facility park.",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/46zY10gX7HZvnaaRE3MOlS/9b545dcd8d47677b5f82648d76510a8b/Teamwork-in-construction-industry---two-engineers-working-together-on-construction-site-with-blueprints-and-plans-645373486.jpeg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000",
    employees: 10,
    applications: 2,
    status: "block",
    users: ["https://randomuser.me/api/portraits/women/21.jpg"],
  },
  {
    id: "5",
    name: "Hospital Extension Wing",
    location: "Boston",
    type: "Healthcare",
    startDate: "2024-10-01",
    endDate: "2025-08-30",
    manager: "Lisa Murphy",
    description: "Extension of existing hospital with new specialized units.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7S-lLuc3_R0BHip0_E4DaRFkOCByq5taPiw&s",
    employees: 18,
    applications: 6,
    status: "progress",
    users: [
      "https://randomuser.me/api/portraits/men/77.jpg",
      "https://randomuser.me/api/portraits/women/78.jpg",
    ],
  },
  {
    id: "6",
    name: "Smart City Infrastructure",
    location: "Miami",
    type: "Infrastructure",
    startDate: "2024-11-15",
    endDate: "2025-12-31",
    manager: "Robert Kim",
    description:
      "Implementation of smart city technologies and infrastructure.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC4LfuAloqInhugs3fSlSxXYA9_15Nso8_LQ&s",
    employees: 25,
    applications: 10,
    status: "completed",
    users: [
      "https://randomuser.me/api/portraits/men/81.jpg",
      "https://randomuser.me/api/portraits/women/82.jpg",
      "https://randomuser.me/api/portraits/men/83.jpg",
    ],
  },
];

const page = () => {
  const [projects, setProjects] = useState(dummyProjects);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const handleDelete = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleView = (project: any) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.location.toLowerCase().includes(search.toLowerCase()) ||
      project.manager.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || project.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container space-y-6 p-10 pb-16 md:block">
      <Card className="border-none bg-background/60 shadow-md backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">
            My Projects
          </CardTitle>
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="max-w-xs">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Local">Local</SelectItem>
                <SelectItem value="International">International</SelectItem>
                <SelectItem value="Sustainable">Sustainable</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No projects found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative rounded-lg border bg-card p-6 transition-all hover:shadow-lg h-[400px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="rounded-full w-24 h-24 overflow-hidden flex-shrink-0">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-foreground/90 truncate">
                          {project.name}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            {project.location}
                          </span>
                          <span className="inline-flex items-center rounded-md bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary-foreground">
                            {project.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p className="flex justify-between">
                        <span className="font-medium">Duration:</span>
                        <span>
                          {project.startDate} - {project.endDate}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-medium">Manager:</span>
                        <span className="text-foreground">
                          {project.manager}
                        </span>
                      </p>
                      <p className="line-clamp-3 text-xs">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="inline-flex items-center gap-1 hover:bg-primary/10"
                      onClick={() => handleView(project)}
                    >
                      <Eye className="h-4 w-4" /> View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="inline-flex items-center gap-1 hover:bg-secondary/10"
                    >
                      <Pencil className="h-4 w-4" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="inline-flex items-center gap-1 hover:scale-105"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
    w-full 
    max-w-[95vw] 
    sm:min-w-[800px] sm:max-w-[850px] 
    h-[85vh] 
    p-0 
    gap-0
  "
        >
          {selectedProject && (
            <div className="w-full h-full p-8 overflow-y-auto">
              <div className="flex flex-col lg:flex-row gap-8 h-auto">
                <div className="lg:w-1/3 flex-shrink-0">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    className="rounded-lg w-full h-[300px] object-cover"
                  />
                </div>
                <div className="lg:w-2/3">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-primary mb-4">
                      {selectedProject.name}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-3">
                    <div className="grid grid-cols-[120px_1fr] items-center">
                      <span className="font-semibold text-muted-foreground">
                        Location:
                      </span>
                      <span>{selectedProject.location}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] items-center">
                      <span className="font-semibold text-muted-foreground">
                        Type:
                      </span>
                      <span>{selectedProject.type}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] items-center">
                      <span className="font-semibold text-muted-foreground">
                        Manager:
                      </span>
                      <span>{selectedProject.manager}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] items-center">
                      <span className="font-semibold text-muted-foreground">
                        Status:
                      </span>
                      <span
                        className={
                          "px-3 py-1 rounded-full text-sm font-medium w-fit " +
                          (selectedProject.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : selectedProject.status === "progress"
                            ? "bg-blue-500/10 text-blue-500"
                            : selectedProject.status === "completed"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-red-500/10 text-red-500")
                        }
                      >
                        {selectedProject.status.charAt(0).toUpperCase() +
                          selectedProject.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] items-center">
                      <span className="font-semibold text-muted-foreground">
                        Duration:
                      </span>
                      <span>
                        {selectedProject.startDate} - {selectedProject.endDate}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="font-semibold text-muted-foreground">
                        Description:
                      </span>app/super-admin/notifications
                      <p className="mt-1 text-sm leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employees Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">
                  Employees ({selectedProject.employees.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedProject.employees.map((emp: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-muted/20 rounded-lg p-3"
                    >
                      <img
                        src={emp.image}
                        alt={emp.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{emp.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {emp.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">
                  Applications ({selectedProject.applications.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedProject.applications.map((app: any, idx: number) => (
                    <div key={idx} className="bg-muted/20 rounded-lg p-3">
                      <p className="font-medium">{app.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {app.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default page;
