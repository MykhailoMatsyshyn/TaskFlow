import { useQuery } from "@tanstack/react-query";
import { getTeamMembers } from "../api/authService";

export const useTeamMembersQuery = (emailLike: string) => {
  return useQuery({
    queryKey: ["teamMembers", emailLike],
    queryFn: () => getTeamMembers(emailLike),
    refetchOnWindowFocus: false,
    enabled: Boolean(emailLike),
  });
};
