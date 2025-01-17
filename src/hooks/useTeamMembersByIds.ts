import { useQuery } from "@tanstack/react-query";
import { User } from "../types/user";
import { getTeamMembersByIds } from "../api/authService";

export const useTeamMembersByIds = (ids: number[]) => {
  return useQuery<User[], Error>({
    queryKey: ["teamMembersByIds", ids], // Унікальний ключ для кешування
    queryFn: () => getTeamMembersByIds(ids), // Виклик API-функції
    enabled: ids.length > 0, // Запит виконується, тільки якщо є ID
  });
};
