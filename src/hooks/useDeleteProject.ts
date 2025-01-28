import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../api/projectService";
import { toast } from "react-toastify";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: number) => deleteProject(projectId),

    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      toast.success("Project deleted successfully!");
    },

    onError: (error: any) => {
      toast.error(`Failed to delete project`);
    },
  });
};
