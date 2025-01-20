import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateColumnTasks } from "../api/projectService";
import { Project } from "../types/project";

export const useUpdateColumnTasks = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Project,
    Error,
    { projectId: number; columnId: string; tasks: any[] }
  >({
    mutationFn: ({ projectId, columnId, tasks }) =>
      updateColumnTasks(projectId, columnId, tasks),
    onSuccess: (updatedProject, { projectId }) => {
      // Оновлюємо кеш проекту після успішного оновлення
      queryClient.setQueryData(["project", projectId], updatedProject);
    },
    onError: (error) => {
      console.error("Error updating column tasks:", error.message);
    },
  });
};
