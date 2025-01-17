import { useQuery } from "@tanstack/react-query";
import { getUserProjects } from "../api/projectService";

const useFetchUserProjects = (userId?: number) => {
  return useQuery({
    queryKey: ["projects", userId],
    queryFn: () => {
      if (!userId) throw new Error("User ID is undefined");
      return getUserProjects(userId);
    },
    enabled: Boolean(userId),
  });
};
export default useFetchUserProjects;
