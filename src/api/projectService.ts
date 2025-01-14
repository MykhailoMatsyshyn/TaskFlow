import { handleRequest } from "./handleRequest";
import { Project } from "../types/project";
import axiosInstance from "./axiosInstance";

export const createProject = (projectData: Project): Promise<Project> => {
  return handleRequest<Project, Project>("/projects", projectData);
};

export const getUserProjects = (userId: number) => {
  return axiosInstance.get(`/projects?userId=${userId}`);
};
