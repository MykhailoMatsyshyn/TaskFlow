export interface Project {
  id?: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  assignedMembers: string[];
  status: "Planned" | "In Progress" | "Completed";
  icon: string;
  userId: number;
}
