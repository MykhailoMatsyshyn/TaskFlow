import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../api/projectService";
import { Project } from "../types/project";

export const useCreateProject = () => {
  const queryClient = useQueryClient(); // Доступ до кешу React Query

  return useMutation<Project, Error, Project>({
    mutationFn: (projectData: Project) => createProject(projectData),
    onSuccess: (data: Project) => {
      console.log("Project created successfully:", data);

      // Інвалідуємо кеш проектів, щоб оновити їх список
      queryClient.invalidateQueries(["projects"]);
    },
    onError: (error: Error) => {
      console.error("Error creating project:", error.message);
    },
  });
};
