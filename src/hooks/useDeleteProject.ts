import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../api/projectService";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: number) => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
    },
    onError: (error: any) => {
      console.error("Error deleting project:", error.message);
    },
  });
};
