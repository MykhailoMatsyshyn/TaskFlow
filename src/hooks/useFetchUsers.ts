import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/authService";
import { User } from "../types/user";

const useFetchUsers = (token: string | null) => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: () => getUsers(token),
    enabled: !!token,
  });
};

export default useFetchUsers;
