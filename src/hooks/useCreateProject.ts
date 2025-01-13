import { useMutation } from "@tanstack/react-query";
import { createProject } from "../api/projectService";
import { Project } from "../types/project";

export const useCreateProject = () =>
  useMutation<Project, Error, Project>({
    mutationFn: (projectData: Project) => createProject(projectData),
    onSuccess: (data: Project) => {
      console.log("Project created successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Error creating project:", error.message);
    },
  });
