import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateColumnInProject } from "../api/projectService";
import { toast } from "react-toastify";

/**
 * Hook for updating a column's title in a project.
 * @param projectId - The ID of the project.
 * @returns A mutation function to update a column.
 */
export const useUpdateColumn = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      columnId,
      newTitle,
    }: {
      columnId: string;
      newTitle: string;
    }) => updateColumnInProject(projectId, columnId, newTitle),

    onSuccess: (_, { newTitle }) => {
      // Invalidate project cache to refetch updated data
      queryClient.invalidateQueries(["project", projectId]);

      toast.success(`Column ${newTitle} was updated successfully.`);
    },

    onError: (error: any) => {
      toast.error("Failed to update column. Please try again.");
    },
  });
};
