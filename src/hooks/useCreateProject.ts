import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../api/projectService";
import { Project } from "../types/project";
import { toast } from "react-toastify";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, Project>({
    mutationFn: (projectData: Project) => createProject(projectData),
    onSuccess: (data: Project) => {
      toast.success("Project created successfully!");
      queryClient.invalidateQueries(["projects"]);
    },
    onError: (error: Error) => {
      toast.error("Failed to create project. Please try again.");
    },
  });
};
