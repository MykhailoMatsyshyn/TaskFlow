import { Project } from "../types/project";
import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";

/**
 * Fetches a project by its slug and checks access permissions.
 * @param {string} slug - The unique project slug.
 * @param {string} userId - The ID of the requesting user.
 * @param {string} role - The role of the user (Admin, Project Manager, Team Member).
 * @returns {Promise<Project>} - The requested project if access is granted.
 * @throws {Error} - If the project is not found or access is denied.
 */
export const getProjectBySlug = async (
  slug: string,
  userId: string,
  role: string
): Promise<Project> => {
  try {
    // Fetch the project by slug
    const { data } = await axiosInstance.get<Project[]>(
      `/projects?slug=${slug}`
    );
    const project = data[0];

    if (!project) {
      throw new Error("Project not found");
    }

    // Access control validation
    if (role === "Admin" || role === "Project Manager") {
      if (project.userId !== Number(userId)) {
        throw new Error("Access denied: You do not own this project.");
      }
    } else if (role === "Team Member") {
      if (!project.assignedMembers.includes(userId)) {
        throw new Error("Access denied: You are not assigned to this project.");
      }
    }

    return project;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Error fetching project data"
      );
    }
    throw new Error("An unknown error occurred while fetching project data");
  }
};
