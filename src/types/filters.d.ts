export type UserFilters = {
  id: number | null;
  name?: string;
  email?: string;
  role?: string;
  pageIndex: number;
  pageSize: number;
};

export type TaskFilters = {
  status: string;
  priority: "Without priority" | "Low" | "Medium" | "High" | "all";
  assignedMembers: number[];
};

export type ProjectFilters = {
  status: "Planned" | "In Progress" | "Completed" | "";
  assignedMembers: number[];
};
