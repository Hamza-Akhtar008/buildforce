export type ProjectType = "commercial" | "local" | "personal";
export type ProjectStatus = "active" | "pending" | "hold";

export interface Project {
   id: string;
   name: string;
   location: string;
   workerCount: number;
   startDate: Date;
   status: ProjectStatus;
   projectType: ProjectType;
   endDate: Date;
   description: string;
   projectManager: string;
   createdAt: Date;
   updatedAt: Date;
}

export interface CreateProjectData {
   fullName: string;
   location: string;
   projectType: ProjectType;
   startDate: string;
   endDate: string;
   description: string;
   projectImage?: File;
   projectManager: string;
}
