import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/taskService";
import { Task } from "../types/task";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, Task>({
    mutationFn: (taskData) => createTask(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]); // Інвалідовуємо список завдань
    },
    onError: (error) => {
      console.error("Error creating task:", error.message);
    },
  });
};
