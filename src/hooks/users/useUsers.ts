import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  getUsers,
  deleteUser,
  getUserInfo,
  updateUser,
} from "../../api/userService";
import { User } from "../../types/user";
import { UserFilters } from "../../types/filters";
import { useAuth } from "../auth/useAuth";
import { toast } from "react-toastify";
import { getAllTasks, updateTask } from "../../api/taskService";
import { getAllProjects, updateProject } from "../../api/projectService";

/**
 * Fetches the authenticated user's information.
 * @returns {UseQueryResult<User, Error>} - The user's data.
 */
export const useFetchUser = (): UseQueryResult<User, Error> => {
  const { userId } = useAuth();
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserInfo(token!, Number(userId)),
    enabled: !!token && !!userId,
  });
};

/**
 * Fetches a list of users based on filters.
 * @param {UserFilters} filters - The filters to apply.
 * @returns {UseQueryResult<{ users: User[], totalCount: number }, Error>} - The list of users.
 */
export const useFetchUsers = (
  filters: UserFilters
): UseQueryResult<{ users: User[]; totalCount: number }, Error> => {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: () => getUsers(filters),
    select: (data) => ({
      users: data.data,
      totalCount: data.totalCount,
    }),
    staleTime: 30000,
  });
};

/**
 * Deletes a user and removes them from all tasks and projects.
 * @returns A mutation function for deleting users.
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      // Delete the user
      await deleteUser(userId);

      // Remove user from tasks
      const tasks = await getAllTasks();
      await Promise.all(
        tasks
          .filter((task) => task.assignedMember === userId)
          .map((task) => updateTask(task.id, { assignedMember: null }))
      );

      // Remove user from assigned projects
      const projects = await getAllProjects();
      await Promise.all(
        projects.map((project) => {
          const updatedMembers = project.assignedMembers.filter(
            (memberId) => Number(memberId) !== userId
          );
          if (updatedMembers.length !== project.assignedMembers.length) {
            return updateProject(project.id, {
              assignedMembers: updatedMembers,
            });
          }
          return Promise.resolve();
        })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      toast.success("User deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete user. Please try again.");
    },
  });
};

/**
 * Updates user data.
 * @returns A mutation function for updating user information.
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { userId: number; updatedData: Partial<User> }) =>
      updateUser(variables.userId, variables.updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update user. Please try again.");
    },
  });
};
