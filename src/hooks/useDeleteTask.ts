import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/taskService";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: number) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]); // Інвалідує список тасок
    },
    onError: (error: any) => {
      console.error("Error deleting task:", error.message);
    },
  });
};
