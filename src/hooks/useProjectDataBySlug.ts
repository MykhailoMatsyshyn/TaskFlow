import { useQuery } from "@tanstack/react-query";
import { getProjectBySlug } from "../api/projectService";
import { useAuth } from "./useAuth";

export const useProjectDataBySlug = (slug: string) => {
  const { userId, role } = useAuth();

  return useQuery({
    queryKey: ["project", slug],
    queryFn: () => getProjectBySlug(slug, userId, role),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};

// import { useQuery } from "@tanstack/react-query";
// import { getProjectBySlug } from "../api/projectService";

// export const useProjectDataBySlug = (
//   slug: string,
//   onError?: (error: any) => void
// ) => {
//   return useQuery({
//     queryKey: ["project", slug],
//     queryFn: () => getProjectBySlug(slug),
//     staleTime: 0, // Дані завжди "несвіжі", щоб вони оновлювались автоматично
//     refetchOnWindowFocus: true, // Автоматичне оновлення при фокусі на вкладку
//     onError,
//     // refetchInterval: 1000, // Опціонально: автоматичне оновлення кожні 10 секунд
//   });
// };

// export const useProjectDataBySlug = (slug: string) => {
//   return useQuery({
//     queryKey: ["project", slug],
//     queryFn: () => getProjectBySlug(slug),
//     // staleTime: 60000,
//     // cacheTime: 300000,
//   });
// };
