import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api/taskService";
import { Task } from "../types/task";
import { toast } from "react-toastify";

export const useUpdateTask = (taskId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Task> }) =>
      updateTask(id, data),
    onMutate: async ({ id, data }) => {
      // Скасувати всі поточні запити для цього таску
      await queryClient.cancelQueries(["task", id]);

      // Зберегти попередній стан
      const previousTask = queryClient.getQueryData<Task>(["task", id]);

      // Оптимістично оновити кеш
      if (previousTask) {
        queryClient.setQueryData(["task", id], {
          ...previousTask,
          ...data, // Оновити тільки змінені поля
        });
      }

      return { previousTask };
    },
    onError: (error, _, context) => {
      // Відновити попередній стан у разі помилки
      if (context?.previousTask) {
        queryClient.setQueryData(["task", taskId], context.previousTask);
      }
      toast.error("Failed to update task. Please try again.");
    },
    onSettled: () => {
      // Інвалідовуємо кеш для оновлення даних
      queryClient.invalidateQueries(["task", taskId]);
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};
