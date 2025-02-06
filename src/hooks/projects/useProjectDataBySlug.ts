import { useQuery } from "@tanstack/react-query";
import { getProjectBySlug } from "../../api/projectAccessService";
import { useAuth } from "../auth/useAuth";

/**
 * Custom hook for fetching project data based on its slug.
 * It retrieves user authentication details and fetches the project with access control.
 *
 * @param {string} slug - The unique identifier (slug) of the project.
 * @returns {UseQueryResult<Project, Error>} - The query result containing project data.
 */
export const useProjectDataBySlug = (slug: string) => {
  const { userId, userRole } = useAuth();
  console.log(userId, userRole);

  return useQuery({
    queryKey: ["project", slug, userId, userRole],
    queryFn: () => getProjectBySlug(slug, Number(userId), userRole),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
