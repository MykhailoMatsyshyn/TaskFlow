// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getProjectBySlug } from "../api/projectService";

// export const useProjectId = () => {
//   const { projectSlug } = useParams<{ projectSlug: string }>();

//   const {
//     data: project,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["project", projectSlug],
//     queryFn: () => getProjectBySlug(projectSlug as string),
//     enabled: !!projectSlug,
//   });

//   return {
//     projectId: project?.id,
//     isLoading,
//     isError,
//   };
// };
