import { AxiosError } from "axios";
import { TaskFilters } from "../types/filters";
import { Task } from "../types/task";
import axiosInstance from "./axiosInstance";

/**
 * Fetches all tasks from the server.
 * @returns {Promise<Task[]>} - A list of all tasks.
 * @throws {Error} - If the request fails.
 */
export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const { data } = await axiosInstance.get<Task[]>("/tasks");
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Error fetching tasks");
    }
    throw new Error("An unknown error occurred while fetching tasks");
  }
};

/**
 * Fetches tasks filtered by project ID and additional filters.
 * @param {number} projectId - The project ID to filter tasks.
 * @param {TaskFilters} filters - Additional filters (status, priority, assigned members).
 * @returns {Promise<Task[]>} - A filtered list of tasks.
 * @throws {Error} - If the request fails.
 */
export const getTasksByProject = async (
  projectId: number,
  filters: TaskFilters
): Promise<Task[]> => {
  try {
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

    const { data } = await axiosInstance.get<Task[]>(
      `/tasks?${query.toString()}`
    );
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Error fetching tasks for project"
      );
    }
    throw new Error(
      "An unknown error occurred while fetching tasks for project"
    );
  }
};

/**
 * Creates a new task.
 * @param {Task} taskData - The task data to be created.
 * @returns {Promise<Task>} - The created task.
 * @throws {Error} - If the request fails.
 */
export const createTask = async (taskData: Task): Promise<Task> => {
  try {
    const { data } = await axiosInstance.post<Task>("/tasks", taskData);
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Error creating task");
    }
    throw new Error("An unknown error occurred while creating task");
  }
};

/**
 * Updates an existing task.
 * @param {number} taskId - The ID of the task to update.
 * @param {Partial<Task>} updatedTask - The updated task data.
 * @returns {Promise<Task>} - The updated task.
 * @throws {Error} - If the request fails.
 */
export const updateTask = async (
  taskId: number,
  updatedTask: Partial<Task>
): Promise<Task> => {
  try {
    const { data } = await axiosInstance.patch<Task>(
      `/tasks/${taskId}`,
      updatedTask
    );
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Error updating task");
    }
    throw new Error("An unknown error occurred while updating task");
  }
};

/**
 * Deletes a task by ID.
 * @param {number} taskId - The ID of the task to delete.
 * @returns {Promise<void>} - Resolves when the task is deleted.
 * @throws {Error} - If the request fails.
 */
export const deleteTask = async (taskId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/tasks/${taskId}`);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Error deleting task");
    }
    throw new Error("An unknown error occurred while deleting task");
  }
};
