import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/taskService";
import { getProjectById, updateColumnTasks } from "../api/projectService";
import { Task } from "../types/task";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) => deleteTask(task.id), // Виклик API для видалення задачі
    onSuccess: async (_, task) => {
      try {
        const { id: taskId, projectId, status: columnId } = task; // Деструктуризація з об'єкта задачі
        const projectKey = ["project", projectId];

        // Отримуємо проект із кешу або API
        let project = queryClient.getQueryData(projectKey);
        if (!project) {
          console.warn("Project data not found in cache. Fetching from API...");
          project = await getProjectById(projectId);
          queryClient.setQueryData(projectKey, project);
        }

        // Знаходимо колонку, з якої потрібно видалити задачу
        const targetColumn = project.columns.find(
          (column: any) => column.id === columnId
        );

        if (!targetColumn) {
          console.warn("Target column not found");
          return;
        }

        // Видаляємо ID задачі з масиву `tasks`
        const updatedTasks = targetColumn.tasks.filter(
          (id: number) => id !== taskId
        );

        // Оновлюємо колонку на сервері
        await updateColumnTasks(projectId, columnId, updatedTasks);

        // Оновлюємо кеш проекту
        queryClient.setQueryData(projectKey, {
          ...project,
          columns: project.columns.map((column: any) =>
            column.id === columnId ? { ...column, tasks: updatedTasks } : column
          ),
        });

        // Інвалідуємо кеш для списку задач
        queryClient.invalidateQueries(["tasks"]);

        console.log("Task deleted and column updated successfully");
      } catch (error) {
        console.error(
          "Error updating column tasks after task deletion:",
          error
        );
      }
    },
    onError: (error: any) => {
      console.error("Error deleting task:", error.message);
    },
  });
};
