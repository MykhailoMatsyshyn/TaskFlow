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
  priority: "Without priority" | "Low" | "Medium" | "High";
  assignedMember: number[];
  startDate: string;
  endDate: string;
};
