import { TaskFilters } from "../types/filters";
import { Task } from "../types/task";
import axiosInstance from "./axiosInstance";

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const { data } = await axiosInstance.get<Task[]>("/tasks");
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error fetching tasks");
  }
};

export const getTasksByProject = (
  projectId: number,
  filters: TaskFilters
): Promise<Task[]> => {
  const query = new URLSearchParams();

  query.append("projectId", String(projectId));

  if (filters.status) {
    query.append("status", filters.status);
  }

  if (filters.priority && filters.priority !== "all") {
    query.append("priority", filters.priority);
  }

  if (filters.assignedMembers.length > 0) {
    filters.assignedMembers.forEach((memberId) =>
      query.append("assignedMember", memberId.toString())
    );
  }

  if (filters.startDate) {
    query.append("startDate", filters.startDate);
  }
  if (filters.endDate) {
    query.append("endDate", filters.endDate);
  }

  return axiosInstance
    .get<Task[]>(`/tasks?${query.toString()}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(
        error.response?.data?.message || "Error fetching tasks for project"
      );
    });
};

export const createTask = (taskData: Task): Promise<Task> => {
  return axiosInstance
    .post<Task>("/tasks", taskData)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message || "Error creating task");
    });
};

export const updateTask = (
  taskId: number,
  updatedTask: Partial<Task>
): Promise<Task> => {
  return axiosInstance
    .patch<Task>(`/tasks/${taskId}`, updatedTask)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message || "Error updating task");
    });
};

export const deleteTask = (taskId: number): Promise<void> => {
  return axiosInstance
    .delete(`/tasks/${taskId}`)
    .then(() => {
      console.log(`Task with ID ${taskId} has been deleted.`);
    })
    .catch((error) => {
      throw new Error(error.response?.data?.message || "Error deleting task");
    });
};
