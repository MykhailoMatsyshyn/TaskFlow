import { Project } from "../types/project";
import axiosInstance from "./axiosInstance";
import { ProjectFilters } from "../types/filters";
import { AxiosError } from "axios";

/**
 * Fetches all projects from the database.
 * @returns {Promise<Project[]>} - A list of all projects.
 * @throws {Error} - If the request fails.
 */
export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const { data } = await axiosInstance.get<Project[]>("/projects");
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Error fetching projects"
      );
    }
    throw new Error("An unknown error occurred while fetching projects");
  }
};

/**
 * Fetches projects assigned to a specific user with optional filters.
 * @param {number} userId - The ID of the user.
 * @param {ProjectFilters} [filters] - Optional filters for querying projects.
 * @returns {Promise<Project[]>} - A list of filtered projects.
 * @throws {Error} - If the request fails.
 */
export const getUserProjects = async (
  userId: number,
  filters?: ProjectFilters
): Promise<Project[]> => {
  try {
    const query = new URLSearchParams();
    query.append("userId", String(userId));

    if (filters) {
      if (filters.status) {
        query.append("status", filters.status);
      }

      if (filters.assignedMembers && filters.assignedMembers.length > 0) {
        filters.assignedMembers.forEach((memberId) =>
          query.append("assignedMembers_like", memberId.toString())
        );
      }
    }

    const { data } = await axiosInstance.get<Project[]>(
      `/projects?${query.toString()}`
    );
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Error fetching user projects"
      );
    }
    throw new Error("An unknown error occurred while fetching user projects");
  }
};

/**
 * Retrieves a project by its ID.
 * @param {number} projectId - The ID of the project.
 * @returns {Promise<Project>} - The project data.
 * @throws {Error} - If the request fails.
 */
export const getProjectById = async (projectId: number): Promise<Project> => {
  try {
    const { data } = await axiosInstance.get<Project>(`/projects/${projectId}`);
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Error fetching project data"
      );
    }
    throw new Error("An unknown error occurred while fetching project data");
  }
};

/**
 * Creates a new project.
 * @param {Project} projectData - The project details to create.
 * @returns {Promise<Project>} - The newly created project.
 * @throws {Error} - If the request fails.
 */
export const createProject = async (projectData: Project): Promise<Project> => {
  try {
    const { data } = await axiosInstance.post<Project>(
      "/projects",
      projectData
    );
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Error creating project"
      );
    }
    throw new Error("An unknown error occurred while creating the project");
  }
};

/**
 * Updates an existing project.
 * @param {number} projectId - The ID of the project to update.
 * @param {Partial<Project>} updatedData - The updated project details.
 * @returns {Promise<Project>} - The updated project data.
 * @throws {Error} - If the request fails.
 */
export const updateProject = async (
  projectId: number,
  updatedData: Partial<Project>
): Promise<Project> => {
  try {
    const { data } = await axiosInstance.patch<Project>(
      `/projects/${projectId}`,
      updatedData
    );
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Error updating project"
      );
    }
    throw new Error("An unknown error occurred while updating the project");
  }
};

/**
 * Deletes a project by its ID.
 * @param {number} projectId - The ID of the project to delete.
 * @returns {Promise<void>} - Resolves if the deletion is successful.
 * @throws {Error} - If the request fails.
 */
export const deleteProject = async (projectId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/projects/${projectId}`);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Error deleting the project"
      );
    }
    throw new Error("An unknown error occurred while deleting the project");
  }
};
