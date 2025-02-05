import { useQuery } from "@tanstack/react-query";
import { User } from "../../types/user";
import { getTeamMembers, getTeamMembersByIds } from "../../api/userService";

/**
 * Fetches team members by their unique IDs.
 * @param {number[]} ids - An array of user IDs to fetch.
 * @returns {UseQueryResult<User[], Error>} - The query result containing the list of users.
 */
export const useTeamMembersByIds = (ids: number[]) => {
  return useQuery<User[], Error>({
    queryKey: ["teamMembersByIds", ids],
    queryFn: () => getTeamMembersByIds(ids),
    enabled: ids.length > 0,
  });
};

/**
 * Fetches team members based on a partial email match.
 * @param {string} emailLike - The email pattern to search for.
 * @returns {UseQueryResult<User[], Error>} - The query result containing matched users.
 */
export const useTeamMembersQuery = (emailLike: string) => {
  return useQuery({
    queryKey: ["teamMembers", emailLike],
    queryFn: () => getTeamMembers(emailLike),
    refetchOnWindowFocus: false,
  });
};
