import { useQuery, useMutation } from "@tanstack/react-query";
import { deleteUser, getUsers } from "../api/authService";
// import { User } from "../types/user";
import { useQueryClient } from "@tanstack/react-query";
import { UserFilters } from "../types/filters";

const useFetchUsers = (filters: UserFilters) => {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: () => getUsers(filters),
    select: (data) => ({
      users: data.data,
      totalCount: data.totalCount,
    }),
  });
};

// const useFetchUsers = (pageIndex: number, pageSize: number, filters: any) => {
//   return useQuery<User[]>({
//     queryKey: ["users", pageIndex, pageSize, filters],
//     queryFn: () => getUsers(pageIndex, pageSize, filters),
//     // enabled: filters !== null && filters !== undefined,
//     // placeholderData: keepPreviousData,
//   });
// };

// Функція для видалення користувача
export const useDeleteUser = () => {
  const queryClient = useQueryClient(); // Використовуємо клієнт для рефрешу запитів

  return useMutation({
    mutationFn: (userId: string) => deleteUser(userId), // Викликаємо функцію deleteUser
    // Після успішного видалення оновлюємо кеш
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};

export default useFetchUsers;
