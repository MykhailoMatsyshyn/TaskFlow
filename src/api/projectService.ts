import { handleRequest } from "./handleRequest";
import { Project } from "../types/project";
import axiosInstance from "./axiosInstance";
import { v4 as uuidv4 } from "uuid";

export const createProject = (projectData: Project): Promise<Project> => {
  return handleRequest<Project, Project>("/projects", projectData);
};

export const deleteProject = async (projectId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/projects/${projectId}`);
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error deleting the project"
    );
  }
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

export const deleteColumnFromProject = async (
  projectId: number,
  columnId: string
): Promise<Project> => {
  try {
    // Step 1: Отримуємо проект
    const { data: project } = await axiosInstance.get<Project>(
      `/projects/${projectId}`
    );

    // Step 2: Фільтруємо колонки, видаляючи потрібну
    const updatedColumns = project.columns.filter(
      (column) => column.id !== columnId
    );

    // Step 3: Оновлюємо проект на сервері
    const { data: updatedProject } = await axiosInstance.patch<Project>(
      `/projects/${projectId}`,
      { columns: updatedColumns }
    );

    return updatedProject;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error deleting column from project"
    );
  }
};
