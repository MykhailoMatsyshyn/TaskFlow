import { TaskPriority } from "./common";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedMember: number | null;
  startDate: string;
  endDate: string;
  priority: TaskPriority;
  projectId: number;
}
