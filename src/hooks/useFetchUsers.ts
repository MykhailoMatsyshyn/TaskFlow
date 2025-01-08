import { useQuery, useMutation } from "@tanstack/react-query";
import { deleteUser, getUsers } from "../api/authService";
import { User } from "../types/user";
import { useQueryClient } from "@tanstack/react-query";

const useFetchUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

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
