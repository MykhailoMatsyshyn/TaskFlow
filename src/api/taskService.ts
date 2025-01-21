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

export const getTasksByProject = (projectId: number): Promise<Task[]> => {
  return axiosInstance
    .get<Task[]>(`/tasks?projectId=${projectId}`)
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
