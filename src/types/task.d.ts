export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedMember: number;
  deadline: string;
  priority: "Low" | "Medium" | "High" | "No Priority";
  projectId: number;
}
