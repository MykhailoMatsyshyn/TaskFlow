export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedMember: number;
  startDate: string;
  endDate: string;
  priority: "Low" | "Medium" | "High" | "Without priority";
  projectId: number;
}
