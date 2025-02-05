import { ProjectStatus } from "./common";

export interface Column {
  id: string;
  title: string;
  tasks: number[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  assignedMembers: string[];
  status: ProjectStatus;
  icon: string;
  userId: number;
  slug: string;
  columns: Column[];
}
