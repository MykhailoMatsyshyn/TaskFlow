import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteColumnFromProject } from "../api/projectService";
import { toast } from "react-toastify";

export const useDeleteColumn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      columnId,
    }: {
      projectId: number;
      columnId: string;
    }) => deleteColumnFromProject(projectId, columnId),
    onSuccess: (_, { columnId }) => {
      // Invalidate project and tasks cache to refetch updated data
      queryClient.invalidateQueries(["project"]);
      queryClient.invalidateQueries(["tasks"]);

      toast.success(
        `Column "${columnId}" and its tasks were deleted successfully.`
      );
    },

    onError: (error: any) => {
      toast.error("Failed to delete column and its tasks. Please try again.");
    },
  });
};
