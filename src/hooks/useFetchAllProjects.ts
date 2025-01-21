import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getAllProjects } from "../api/projectService";
import { Project } from "../types/project";

export const useFetchAllProjects = (): UseQueryResult<Project[], Error> => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });
};
