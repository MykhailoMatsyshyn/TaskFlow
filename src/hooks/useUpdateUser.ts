import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/authService";
import { User } from "../types/user";
import { toast } from "react-toastify";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { userId: number; updatedData: Partial<User> }) =>
      updateUser(variables.userId, variables.updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User updated successfully!");
    },
    onError: (error: any) => {
      toast.error("Failed to update user. Please try again.");
    },
  });
};
