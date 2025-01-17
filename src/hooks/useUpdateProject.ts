import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../api/projectService";
import { Project } from "../types/project";

export const useUpdateProject = (projectId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Project> }) =>
      updateProject(id, data),
    onMutate: async ({ id, data }) => {
      // Скасувати поточні запити
      await queryClient.cancelQueries(["project", id]);

      // Зберегти попередній стан
      const previousProject = queryClient.getQueryData<Project>([
        "project",
        id,
      ]);

      // Оптимістичне оновлення кешу
      if (previousProject) {
        queryClient.setQueryData(["project", id], {
          ...previousProject,
          ...data, // Оновлюємо тільки ті поля, які змінилися
        });
      }

      return { previousProject };
    },
    onError: (error, _, context) => {
      // Відновлення попереднього стану в разі помилки
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
      queryClient.invalidateQueries(["projects"]);
    },
  });
};
