import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addColumnToProject,
  updateColumnInProject,
  updateProjectColumns,
  deleteColumnFromProject,
} from "../../api/projectColumnsService";
import { toast } from "react-toastify";
import { Project } from "../../types/project";
import { startCase } from "lodash";

/**
 * Creates a new column in a project.
 * @param {number} projectId - The ID of the project.
 * @returns {UseMutationResult<Project, Error, string>} - The mutation for creating a column.
 */
export const useCreateColumn = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (columnTitle: string) =>
      addColumnToProject(projectId, columnTitle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
      toast.success(`Column added successfully!`);
    },
    onError: () => {
      toast.error("Failed to add column. Please try again.");
    },
  });
};

/**
 * Updates a column's title in a project.
 * @param {number} projectId - The ID of the project.
 * @returns {UseMutationResult<Project, Error, { columnId: string; newTitle: string }>} - The mutation for updating a column.
 */
export const useUpdateColumn = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      columnId,
      newTitle,
    }: {
      columnId: string;
      newTitle: string;
    }) => updateColumnInProject(projectId, columnId, newTitle),

    onSuccess: (_, { newTitle }) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      toast.success(`Column ${newTitle} was updated successfully.`);
    },

    onError: () => {
      toast.error("Failed to update column. Please try again.");
    },
  });
};

/**
 * Updates multiple columns in a project.
 * @param {number} [projectId] - The ID of the project.
 * @returns {UseMutationResult<Project, Error, { id: string; title: string }[]>} - The mutation for updating multiple columns.
 */
export const useUpdateColumns = (projectId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (columns: { id: string; title: string }[]) =>
      updateProjectColumns(projectId!, columns),
    onMutate: async (newColumns) => {
      await queryClient.cancelQueries({ queryKey: ["project", projectId] });

      const previousProject = queryClient.getQueryData<Project>([
        "project",
        projectId,
      ]);

      if (previousProject) {
        queryClient.setQueryData(["project", projectId], {
          ...previousProject,
          columns: newColumns,
        });
      }

      return { previousProject };
    },
    onError: (_, __, context) => {
      if (context?.previousProject) {
        queryClient.setQueryData(
          ["project", projectId],
          context.previousProject
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });
};

/**
 * Deletes a column from a project.
 * @returns {UseMutationResult<void, Error, { projectId: number; columnId: string }>} - The mutation for deleting a column.
 */
export const useDeleteColumn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      columnId,
    }: {
      projectId: number;
      columnId: string;
    }) => deleteColumnFromProject(projectId, columnId),

    onSuccess: (_, { columnId }) => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      toast.success(`Column ${startCase(columnId)} was deleted successfully.`);
    },

    onError: () => {
      toast.error("Failed to delete column. Please try again.");
    },
  });
};
