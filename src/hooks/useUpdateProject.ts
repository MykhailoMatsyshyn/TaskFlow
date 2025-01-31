import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../api/projectService";
import { Project } from "../types/project";
import { toast } from "react-toastify";

export const useUpdateProject = (projectId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Project> }) =>
      updateProject(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries(["project", id]);

      const previousProject = queryClient.getQueryData<Project>([
        "project",
        id,
      ]);

      if (previousProject) {
        queryClient.setQueryData(["project", id], {
          ...previousProject,
          ...data,
        });
      }

      return { previousProject };
    },
    onSuccess: () => {
      toast.success("Project updated successfully!");
    },
    onError: (error, _, context) => {
      toast.error("Failed to update project. Please try again.");
      if (context?.previousProject) {
        queryClient.setQueryData(
          ["project", projectId],
          context.previousProject
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["project", projectId]);
      queryClient.invalidateQueries(["projects"]);
    },
  });
};
