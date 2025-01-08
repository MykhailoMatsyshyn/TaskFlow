import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/authService";
import { useAuth } from "./useAuth"; // Імпортуємо хук useAuth

const useFetchUser = () => {
  const { userId } = useAuth(); // Отримуємо userId з хука useAuth
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["user", userId], // Ключ для кешування
    queryFn: () => getUserInfo(token!, userId), // Функція для отримання даних
    enabled: !!token && !!userId, // Запит виконується тільки якщо є токен і userId
  });
};

export default useFetchUser;
