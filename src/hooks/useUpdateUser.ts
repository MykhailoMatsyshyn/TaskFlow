import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/authService";
import { User } from "../types/user";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { userId: number; updatedData: Partial<User> }) =>
      updateUser(variables.userId, variables.updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error: any) => {
      console.error("Error updating user:", error.message);
    },
  });
};
