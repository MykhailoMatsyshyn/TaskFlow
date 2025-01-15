import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteColumnFromProject } from "../api/projectService";

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
    onSuccess: () => {
      queryClient.invalidateQueries(["project"]); // Інвалідуємо кеш проекту
    },
    onError: (error: any) => {
      console.error("Error deleting column:", error.message);
    },
  });
};
