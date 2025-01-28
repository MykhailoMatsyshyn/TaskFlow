import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectColumns } from "../api/projectService";
import { Project } from "../types/project";

export const useUpdateColumns = (projectId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (columns: { id: string; title: string }[]) =>
      updateProjectColumns(projectId!, columns),
    onMutate: async (newColumns) => {
      // Скасувати всі запити, щоб уникнути конфліктів
      await queryClient.cancelQueries(["project", projectId]);

      // Отримати попередні дані проекту
      const previousProject = queryClient.getQueryData<Project>([
        "project",
        projectId,
      ]);
      k;

      // Оптимістично оновити локальні дані
      if (previousProject) {
        queryClient.setQueryData(["project", projectId], {
          ...previousProject,
          columns: newColumns,
        });
      }

      return { previousProject };
    },
    onError: (error, newColumns, context) => {
      // Відновити попередні дані у разі помилки
      if (context?.previousProject) {
        queryClient.setQueryData(
          ["project", projectId],
          context.previousProject
        );
      }
    },
    onSettled: () => {
      // Інвалідовано кеш, щоб оновити дані з бекенда
      queryClient.invalidateQueries(["project", projectId]);
    },
  });
};
