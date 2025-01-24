import { useQuery, useMutation } from "@tanstack/react-query";
import { deleteUser, getUsers } from "../api/authService";
// import { User } from "../types/user";
import { useQueryClient } from "@tanstack/react-query";
import { UserFilters } from "../types/filters";
import { getAllTasks, updateTask } from "../api/taskService";
import { getAllProjects, updateProject } from "../api/projectService";

const useFetchUsers = (filters: UserFilters) => {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: () => getUsers(filters),
    select: (data) => ({
      users: data.data,
      totalCount: data.totalCount,
    }),
    staleTime: 30000,
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
// export const useDeleteUser = () => {
//   const queryClient = useQueryClient(); // Використовуємо клієнт для рефрешу запитів

//   return useMutation({
//     mutationFn: (userId: number) => deleteUser(userId), // Викликаємо функцію deleteUser
//     // Після успішного видалення оновлюємо кеш
//     onSuccess: () => {
//       queryClient.invalidateQueries(["users"]);
//     },
//   });
// };

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      // Видаляємо користувача
      await deleteUser(userId);

      // Отримуємо всі завдання
      const tasks = await getAllTasks();

      // Оновлюємо завдання, де користувач призначений
      await Promise.all(
        tasks
          .filter((task) => task.assignedMember === userId)
          .map(
            (task) => updateTask(task.id, { assignedMember: "" }) // Видаляємо призначення
          )
      );

      // Отримуємо всі проєкти
      const projects = await getAllProjects();

      // Оновлюємо проєкти, видаляючи користувача з assignedMembers
      await Promise.all(
        projects.map((project) => {
          const updatedMembers = project.assignedMembers.filter(
            (memberId) => memberId !== userId
          );
          if (updatedMembers.length !== project.assignedMembers.length) {
            return updateProject(project.id, {
              assignedMembers: updatedMembers,
            });
          }
          return Promise.resolve(); // Якщо оновлення не потрібне
        })
      );
    },
    onSuccess: () => {
      // Інвалідуємо кеш, щоб оновити дані на сторінці
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["projects"]);
    },
  });
};

export default useFetchUsers;
