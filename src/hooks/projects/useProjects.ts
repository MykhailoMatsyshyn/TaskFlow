import {
  useQuery,
  UseQueryResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getUserProjects,
  updateProject,
} from "../../api/projectService";
import { Project } from "../../types/project";
import { ProjectFilters } from "../../types/filters";
import { toast } from "react-toastify";

/**
 * Fetches all projects.
 * @returns {UseQueryResult<Project[], Error>} - The list of all projects.
 */
export const useProjects = (): UseQueryResult<Project[], Error> => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });
};

/**
 * Fetches projects for a specific user with optional filters.
 * @param {number} userId - The ID of the user.
 * @param {ProjectFilters} [filters] - Optional filters for projects.
 * @returns {UseQueryResult<Project[], Error>} - The user's projects.
 */
export const useUserProjects = (
  userId: number,
  filters?: ProjectFilters
): UseQueryResult<Project[], Error> => {
  return useQuery({
    queryKey: ["projects", userId, filters],
    queryFn: () => getUserProjects(userId, filters),
    enabled: !!userId, // Only fetch if userId is valid
    staleTime: 5000, // Data stays fresh for 5 seconds
  });
};

/**
 * Creates a new project.
 * @returns {UseMutationResult<Project, Error, Project>} - Mutation for creating a project.
 */
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, Project>({
    mutationFn: (projectData: Project) => createProject(projectData),
    onSuccess: () => {
      toast.success("Project created successfully!");
      queryClient.invalidateQueries({ queryKey: ["projects"] }); // Refresh project list
    },
    onError: () => {
      toast.error("Failed to create project. Please try again.");
    },
  });
};

/**
 * Updates an existing project.
 * @returns {UseMutationResult<Project, Error, { id: number; data: Partial<Project> }>} - Mutation for updating a project.
 */
export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Project> }) =>
      updateProject(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["project", id] });

      const previousProject = queryClient.getQueryData<Project>([
        "project",
        id,
      ]);

      if (previousProject) {
        queryClient.setQueryData(["project", id], {
          ...previousProject,
          ...data,
        });
      }

      return { previousProject };
    },
    onSuccess: () => {
      toast.success("Project updated successfully!");
    },
    onError: (_, __, context) => {
      toast.error("Failed to update project. Please try again.");
      if (context?.previousProject) {
        queryClient.setQueryData(["project"], context.previousProject);
      }
    },
    onSettled: (_, __, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["project", id] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

/**
 * Deletes a project.
 * @returns {UseMutationResult<void, Error, number>} - Mutation for deleting a project.
 */
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: number) => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] }); // Refresh projects list
      toast.success("Project deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete project");
    },
  });
};
