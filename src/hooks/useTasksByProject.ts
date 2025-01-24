import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getTasksByProject } from "../api/taskService";
import { Task } from "../types/task";
import { TaskFilters } from "../types/filters";

export const useTasksByProject = (
  projectId: number,
  filters: TaskFilters
): UseQueryResult<Task[], Error> => {
  return useQuery({
    queryKey: ["tasks", projectId, filters],
    queryFn: () => getTasksByProject(projectId, filters),
    enabled: !!projectId,
    staleTime: 5000,
  });
};

// import { useQuery, UseQueryResult } from "@tanstack/react-query";
// import { getTasksByProject } from "../api/taskService";
// import { Task } from "../types/task";

// export const useTasksByProject = (
//   projectId: number
// ): UseQueryResult<Task[], Error> => {
//   return useQuery({
//     queryKey: ["tasks", projectId], // Унікальний ключ для кешування
//     queryFn: () => getTasksByProject(projectId), // Функція запиту
//     // staleTime: 60000, // Дані вважаються "свіжими" протягом 60 секунд
//     // cacheTime: 300000, // Кеш зберігається 5 хвилин
//     enabled: !!projectId, // Виконувати запит лише якщо projectId не є undefined
//   });
// };
