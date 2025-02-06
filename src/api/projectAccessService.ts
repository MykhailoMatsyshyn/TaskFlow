import { Project } from "../types/project";
import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";

/**
 * Fetches a project by its slug and checks access permissions.
 * @param {string} slug - The unique project slug.
 * @param {number} userId - The ID of the requesting user.
 * @param {string} role - The role of the user (Admin, Project Manager, Team Member).
 * @returns {Promise<Project>} - The requested project if access is granted.
 * @throws {Error} - If the project is not found or access is denied.
 */
export const getProjectBySlug = async (
  slug: string,
  userId: number,
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

    const assignedMembers = Array.isArray(project.assignedMembers)
      ? project.assignedMembers.map(Number)
      : [];

    const isProjectOwner = project.userId === userId;
    const isAssignedMember = assignedMembers.includes(userId);

    console.log(`User ID: ${userId}, Role: ${role}`);
    console.log(
      `Project Owner: ${isProjectOwner}, Assigned Members:`,
      assignedMembers
    );
    console.log(`isAssignedMember: ${isAssignedMember}`);

    if (role === "Admin") {
      return project;
    }

    if (role === "Project Manager" && isProjectOwner) {
      return project;
    }

    if (role === "Team Member" && isAssignedMember) {
      return project;
    }

    throw new Error(
      "Access denied: You do not have permission to view this project."
    );
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Error fetching project data"
      );
    }
    throw new Error("An unknown error occurred while fetching project data");
  }
};
