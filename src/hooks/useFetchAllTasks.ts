import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Task } from "../types/task";
import { getAllTasks } from "../api/taskService";

export const useFetchAllTasks = (): UseQueryResult<Task[], Error> => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
  });
};
