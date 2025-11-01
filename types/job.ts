


 enum WorkDuration { Medium = 'medium', ShortTerm = 'short-term', LongTerm = 'long-term', Permanent = 'permanent', }
  enum Shift { Day = 'day', Night = 'night', Both = 'both', } 
  enum SkillLevel { Beginner = 'beginner', Intermediate = 'intermediate', Expert = 'expert', NeedTraining = 'need_training', }
export interface Job {
  id: number;
  isActive: boolean;
  createdAt: string;          // ISO timestamp
  updatedAt: string;          // ISO timestamp
  title: string;
  description: string;        // main text or summary
  hiringInfo: string;         // e.g., "Hiring 10 workers"
  postedOn: string;           // date string (ISO or yyyy-mm-dd)
  startDate: string;          // date string
  workDuration: WorkDuration; // enum
  shift: Shift;               // enum
  skillLevel: SkillLevel;     // enum
  salary: string;             // e.g., "$25/hr"
  location: string;           // short address, e.g. "Houston, TX 77070"
  fullAddress: string;        // complete address
  scheduleDays: string[];     // e.g. ["M", "T", "W", "Th", "F"]
  shiftHours: string;         // e.g. "6am - 4pm"
  shiftNote?: string;         // optional
  experience: string[];       // e.g. ["Commercial"]
  licenses: string[];         // e.g. ["TDLR - Apprentice Electrician"]
  skills: string[];           // e.g. ["Bending Conduit", "Rough In"]
  benefits: string[];         // e.g. ["Health Insurance", "Flexible Schedule"]
  projectId: number;      
  project:Project    // reference to Project entity
}


export interface Owner {
  id: number;
  name: string;
  logoUrl?: string | null;
  about?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}



export interface Project {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  budget: string;
  status: string;
  ownerId: string;
  owner: Owner;
}