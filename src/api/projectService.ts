import { handleRequest } from "./handleRequest";
import { Project } from "../types/project";

export const createProject = (projectData: Project): Promise<Project> => {
  return handleRequest<Project, Project>("/projects", projectData);
};
