import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addColumnToProject } from "../api/projectService";
import { toast } from "react-toastify";

export const useCreateColumn = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (columnTitle: string) =>
      addColumnToProject(projectId, columnTitle),
    onSuccess: () => {
      queryClient.invalidateQueries(["project"]);
      toast.success("Column added successfully!");
    },
    onError: (error: any) => {
      toast.error("Failed to add column. Please try again.");
    },
  });
};
