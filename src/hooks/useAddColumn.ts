import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addColumnToProject } from "../api/projectService";

export const useAddColumn = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (columnTitle: string) =>
      addColumnToProject(projectId, columnTitle),
    onSuccess: () => {
      // Інвалідуємо кеш запиту, щоб отримати оновлені дані
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
    onError: (error: any) => {
      console.error("Error adding column:", error.message);
    },
  });
};
