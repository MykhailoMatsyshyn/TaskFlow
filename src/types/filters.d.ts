export type UserFilters = {
  id?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  role?: string | undefined;
  pageIndex?: number | undefined;
  pageSize?: number | undefined;
};

export type TaskFilters = {
  status: string;
  priority: "Without priority" | "Low" | "Medium" | "High" | "all";
  assignedMembers: number[];
  startDate: string;
  endDate: string;
};

export type ProjectFilters = {
  status: "Planned" | "In Progress" | "Completed" | "";
  assignedMembers: number[];
};
