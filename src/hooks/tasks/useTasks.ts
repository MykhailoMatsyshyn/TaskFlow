import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTasksByProject,
  updateTask,
} from "../../api/taskService";
import { updateColumnTasks } from "../../api/projectColumnsService";
import { getProjectById } from "../../api/projectService";
import { Task } from "../../types/task";
import { TaskFilters } from "../../types/filters";
import { toast } from "react-toastify";
import { Project } from "../../types/project";
import { Column } from "../../types/project";

/**
 * Fetches all tasks.
 * @returns {UseQueryResult<Task[], Error>} - The list of all tasks.
 */
export const useTasks = (): UseQueryResult<Task[], Error> => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
  });
};

/**
 * Fetches tasks for a specific project.
 * @param {number} projectId - The project ID.
 * @param {TaskFilters} filters - Filters for tasks.
 * @returns {UseQueryResult<Task[], Error>} - The filtered task list.
 */
export const useTasksByProject = (
  projectId: number,
  filters: TaskFilters
): UseQueryResult<Task[], Error> => {
  return useQuery({
    queryKey: ["tasks", projectId, filters],
    queryFn: () => getTasksByProject(projectId, filters),
    enabled: !!projectId,
    // staleTime: 5000,
    // placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};

/**
 * Creates a new task and updates column tasks in the project.
 * @returns {UseMutationResult<Task, Error, Task>} - The mutation for creating tasks.
 */
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, Task>({
    mutationFn: (taskData) => createTask(taskData),
    onSuccess: async (newTask) => {
      try {
        const projectKey = ["project", newTask.projectId];

        let project = queryClient.getQueryData<Project>(projectKey);
        if (!project) {
          project = await getProjectById(newTask.projectId);
          queryClient.setQueryData(projectKey, project);
        }

        const targetColumn = project.columns.find(
          (column: Column) => column.id === newTask.status
        );

        if (!targetColumn) {
          toast.error("Error: Target column not found.");
          return;
        }

        const updatedTasks = [...(targetColumn.tasks || []), newTask.id];
        await updateColumnTasks(
          newTask.projectId,
          newTask.status,
          updatedTasks
        );

        queryClient.setQueryData(projectKey, {
          ...project,
          columns: project.columns.map((column: Column) =>
            column.id === newTask.status
              ? { ...column, tasks: updatedTasks }
              : column
          ),
        });

        // queryClient.invalidateQueries("tasks");
        // queryClient.invalidateQueries({ queryKey: ["tasks"] });

        queryClient.invalidateQueries();

        toast.success("Task created successfully!");
      } catch {
        toast.error("Failed to update column tasks.");
      }
    },
    onError: () => {
      toast.error("Failed to create task. Please try again later.");
    },
  });
};

/**
 * Updates an existing task.
 * @returns {UseMutationResult<Task, Error, { id: number; data: Partial<Task> }>} - The mutation for updating tasks.
 */
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Task> }) =>
      updateTask(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["task", id] });

      const previousTask = queryClient.getQueryData<Task>(["task", id]);

      if (previousTask) {
        queryClient.setQueryData(["task", id], {
          ...previousTask,
          ...data,
        });
      }

      return { previousTask };
    },
    onError: (_, __, context) => {
      if (context?.previousTask) {
        queryClient.setQueryData(["task"], context.previousTask);
      }
      toast.error("Failed to update task. Please try again.");
    },
    onSettled: (_, __, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["task", id] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

/**
 * Deletes a task and updates the column tasks in the project.
 * @returns {UseMutationResult<void, Error, Task>} - The mutation for deleting tasks.
 */
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) => deleteTask(task.id),
    onSuccess: async (_, task) => {
      try {
        const { id: taskId, projectId, status: columnId } = task;
        const projectKey = ["project", projectId];

        let project = queryClient.getQueryData<Project>(projectKey);
        if (!project) {
          project = await getProjectById(projectId);
          queryClient.setQueryData(projectKey, project);
        }

        const targetColumn = project.columns.find(
          (column: Column) => column.id === columnId
        );

        if (!targetColumn) {
          toast.warn("Something went wrong while updating columns.");
          return;
        }

        const updatedTasks = targetColumn.tasks.filter(
          (id: number) => id !== taskId
        );

        await updateColumnTasks(projectId, columnId, updatedTasks);

        queryClient.setQueryData(projectKey, {
          ...project,
          columns: project.columns.map((column: Column) =>
            column.id === columnId ? { ...column, tasks: updatedTasks } : column
          ),
        });

        queryClient.invalidateQueries({ queryKey: ["tasks"] });

        toast.success("Task deleted successfully!");
      } catch {
        toast.error("Failed to update project data. Please try again.");
      }
    },
    onError: () => {
      toast.error("Failed to delete task. Please try again.");
    },
  });
};
