import { Project } from "../types/project";
import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";
import { kebabCase } from "lodash";

/**
 * Adds a new column to the project.
 * @param {number} projectId - The ID of the project.
 * @param {string} columnTitle - The title of the new column.
 * @returns {Promise<Project>} - The updated project.
 * @throws {Error} - If the request fails.
 */
export const addColumnToProject = async (
  projectId: number,
  columnTitle: string
): Promise<Project> => {
  try {
    const { data: project } = await axiosInstance.get<Project>(
      `/projects/${projectId}`
    );

    const newColumn = {
      id: kebabCase(columnTitle),
      title: columnTitle,
      tasks: [],
    };

    const updatedColumns = [...project.columns, newColumn];

    const { data: updatedProject } = await axiosInstance.patch<Project>(
      `/projects/${projectId}`,
      { columns: updatedColumns }
    );

    return updatedProject;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Error adding column to project"
      );
    }
    throw new Error("An unknown error occurred while adding column to project");
  }
};

/**
 * Deletes a column from the project along with all its associated tasks.
 * @param {number} projectId - The ID of the project.
 * @param {string} columnId - The ID of the column to delete.
 * @returns {Promise<Project>} - The updated project.
 * @throws {Error} - If the request fails.
 */
export const deleteColumnFromProject = async (
  projectId: number,
  columnId: string
): Promise<Project> => {
  try {
    const { data: project } = await axiosInstance.get<Project>(
      `/projects/${projectId}`
    );

    const { data: tasksToDelete } = await axiosInstance.get(
      `/tasks?projectId=${projectId}&status=${columnId}`
    );

    await Promise.all(
      tasksToDelete.map((task: { id: number }) =>
        axiosInstance.delete(`/tasks/${task.id}`)
      )
    );

    const updatedColumns = project.columns.filter(
      (column) => column.id !== columnId
    );

    const { data: updatedProject } = await axiosInstance.patch<Project>(
      `/projects/${projectId}`,
      { columns: updatedColumns }
    );

    return updatedProject;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Error deleting column from project"
      );
    }
    throw new Error(
      "An unknown error occurred while deleting column from project"
    );
  }
};

/**
 * Updates the title of a column in the project.
 * @param {number} projectId - The ID of the project.
 * @param {string} columnId - The ID of the column to update.
 * @param {string} newTitle - The new title for the column.
 * @returns {Promise<Project>} - The updated project.
 * @throws {Error} - If the request fails.
 */
export const updateColumnInProject = async (
  projectId: number,
  columnId: string,
  newTitle: string
): Promise<Project> => {
  try {
    const { data: project } = await axiosInstance.get<Project>(
      `/projects/${projectId}`
    );

    const newColumnId = kebabCase(newTitle);

    const isDuplicate = project.columns.some(
      (col) => col.id === newColumnId && col.id !== columnId
    );
    if (isDuplicate) {
      throw new Error("A column with this title already exists.");
    }

    const updatedColumns = project.columns.map((column) =>
      column.id === columnId
        ? { ...column, id: newColumnId, title: newTitle }
        : column
    );

    const { data: updatedProject } = await axiosInstance.patch<Project>(
      `/projects/${projectId}`,
      { columns: updatedColumns }
    );

    return updatedProject;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Error updating column");
    }
    throw new Error("An unknown error occurred while updating column");
  }
};

/**
 * Updates the list of columns in the project.
 * @param {number} projectId - The ID of the project.
 * @param {{ id: string; title: string }[]} columns - The updated column list.
 * @returns {Promise<Project>} - The updated project.
 * @throws {Error} - If the request fails.
 */
export const updateProjectColumns = async (
  projectId: number,
  columns: { id: string; title: string }[]
): Promise<Project> => {
  try {
    const { data } = await axiosInstance.patch<Project>(
      `/projects/${projectId}`,
      { columns }
    );
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Error updating project columns"
      );
    }
    throw new Error("An unknown error occurred while updating project columns");
  }
};

/**
 * Updates the tasks of a specific column in a project.
 * @param {number} projectId - The ID of the project.
 * @param {string} columnId - The ID of the column.
 * @param {number[]} tasks - The new list of tasks.
 * @returns {Promise<Project>} - The updated project.
 * @throws {Error} - If the request fails.
 */
export const updateColumnTasks = async (
  projectId: number,
  columnId: string,
  tasks: number[]
): Promise<Project> => {
  try {
    const { data: project } = await axiosInstance.get<Project>(
      `/projects/${projectId}`
    );

    const updatedColumns = project.columns.map((column) =>
      column.id === columnId ? { ...column, tasks } : column
    );

    const { data: updatedProject } = await axiosInstance.patch<Project>(
      `/projects/${projectId}`,
      { columns: updatedColumns }
    );

    return updatedProject;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Error updating column tasks"
      );
    }
    throw new Error("An unknown error occurred while updating column tasks");
  }
};
