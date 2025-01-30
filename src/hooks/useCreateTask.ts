import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/taskService";
import { updateColumnTasks, getProjectById } from "../api/projectService";
import { Task } from "../types/task";
import { toast } from "react-toastify";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, Task>({
    mutationFn: (taskData) => createTask(taskData),
    onSuccess: async (newTask) => {
      try {
        const projectKey = ["project", newTask.projectId];

        // Отримуємо проект із кешу або API
        let project = queryClient.getQueryData(projectKey);
        if (!project) {
          console.warn("Project data not found in cache. Fetching from API...");
          project = await getProjectById(newTask.projectId);
          queryClient.setQueryData(projectKey, project);
        }

        // Знаходимо потрібну колонку
        const targetColumn = project.columns.find(
          (column: any) => column.id === newTask.status
        );

        if (!targetColumn) {
          toast.error("Error: Target column not found.");
          return;
        }

        // Оновлюємо список задач у колонці
        const updatedTasks = [...(targetColumn.tasks || []), newTask.id];
        await updateColumnTasks(
          newTask.projectId,
          newTask.status,
          updatedTasks
        );

        // Оновлюємо кеш проекту
        queryClient.setQueryData(projectKey, {
          ...project,
          columns: project.columns.map((column: any) =>
            column.id === newTask.status
              ? { ...column, tasks: updatedTasks }
              : column
          ),
        });

        // Інвалідовуємо список завдань
        queryClient.invalidateQueries(["tasks"]);

        toast.success("Task created successfully!");
      } catch (error) {
        toast.error("Failed to update column tasks.");
      }
    },
    onError: (error) => {
      toast.error("Failed to create task. Please try again later.");
    },
  });
};
