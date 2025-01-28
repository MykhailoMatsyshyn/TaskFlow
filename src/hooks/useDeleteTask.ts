import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/taskService";
import { getProjectById, updateColumnTasks } from "../api/projectService";
import { Task } from "../types/task";
import { toast } from "react-toastify";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // API request to delete a task
    mutationFn: (task: Task) => deleteTask(task.id),

    // ✅ Called when the mutation is successful
    onSuccess: async (_, task) => {
      try {
        const { id: taskId, projectId, status: columnId } = task;
        const projectKey = ["project", projectId];

        // Retrieve project data from cache or fetch from API if not available
        let project = queryClient.getQueryData(projectKey);
        if (!project) {
          project = await getProjectById(projectId);
          queryClient.setQueryData(projectKey, project);
        }

        // Find the column that contains the deleted task
        const targetColumn = project.columns.find(
          (column: any) => column.id === columnId
        );

        if (!targetColumn) {
          toast.warn("Something went wrong while updating columns.");
          return;
        }

        // Remove the deleted task ID from the column's tasks array
        const updatedTasks = targetColumn.tasks.filter(
          (id: number) => id !== taskId
        );

        // Update the column on the server
        await updateColumnTasks(projectId, columnId, updatedTasks);

        // Update the cache with the new column data
        queryClient.setQueryData(projectKey, {
          ...project,
          columns: project.columns.map((column: any) =>
            column.id === columnId ? { ...column, tasks: updatedTasks } : column
          ),
        });

        // Invalidate the tasks cache to refetch updated data
        queryClient.invalidateQueries(["tasks"]);

        toast.success("Task deleted successfully!");
      } catch (error) {
        toast.error("Failed to update project data. Please try again.");
      }
    },

    // ❌ Called when the mutation fails
    onError: (error: any) => {
      toast.error(`Failed to delete task!`);
    },
  });
};
