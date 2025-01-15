import { handleRequest } from "./handleRequest";
import { Project } from "../types/project";
import axiosInstance from "./axiosInstance";
import { v4 as uuidv4 } from "uuid";

export const createProject = (projectData: Project): Promise<Project> => {
  return handleRequest<Project, Project>("/projects", projectData);
};

export const getUserProjects = (userId: number) => {
  return axiosInstance.get(`/projects?userId=${userId}`);
};

export const getProjectById = (projectId: number): Promise<Project> => {
  return axiosInstance
    .get<Project>(`/projects/${projectId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(
        error.response?.data?.message || "Error fetching project data"
      );
    });
};

export const getProjectBySlug = (slug: string): Promise<Project> => {
  return axiosInstance
    .get<Project[]>(`/projects?slug=${slug}`)
    .then((response) => {
      if (response.data.length === 0) {
        throw new Error("Project not found");
      }
      return response.data[0];
    });
};

export const updateProjectColumns = (
  projectId: number,
  columns: { id: string; title: string }[]
): Promise<Project> => {
  return axiosInstance
    .patch<Project>(`/projects/${projectId}`, { columns })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(
        error.response?.data?.message || "Error updating project columns"
      );
    });
};

export const addColumnToProject = async (
  projectId: number,
  columnTitle: string
): Promise<Project> => {
  try {
    // Step 1: Fetch the current project
    const { data: project } = await axiosInstance.get<Project>(
      `/projects/${projectId}`
    );

    // Step 2: Generate a new column
    const newColumn = {
      id: uuidv4(), // Unique ID for the column
      title: columnTitle,
    };

    // Step 3: Update columns array
    const updatedColumns = [...project.columns, newColumn];

    // Step 4: Update the backend
    const { data: updatedProject } = await axiosInstance.patch<Project>(
      `/projects/${projectId}`,
      { columns: updatedColumns }
    );

    return updatedProject;
  } catch (error: any) {
    // Step 5: Error handling
    throw new Error(
      error.response?.data?.message || "Error adding column to project"
    );
  }
};
