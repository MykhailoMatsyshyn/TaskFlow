import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getUserProjects } from "../api/projectService";
import { Project } from "../types/project";
import { ProjectFilters } from "../types/filters";

export const useFetchUserProjects = (
  userId: number,
  filters?: ProjectFilters
): UseQueryResult<Project[], Error> => {
  return useQuery({
    queryKey: ["projects", userId, filters],
    queryFn: () => getUserProjects(userId, filters),
    enabled: !!userId,
    staleTime: 5000,
  });
};
