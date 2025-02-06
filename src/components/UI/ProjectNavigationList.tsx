import useProjectsFilterStore from "../../stores/filters/ProjectsFilterStore";
import { useRef } from "react";
import useDraggableScroll from "use-draggable-scroll";
import ProjectNavigationItem from "./ProjectNavigationItem";
import { useUserProjects } from "../../hooks/projects/useProjects";
import InlineLoader from "../Loaders/InlineLoader";
import { useAuth } from "../../hooks/auth/useAuth";

const ProjectNavigationList = () => {
  const filters = useProjectsFilterStore((state) => state.filters);

  const { userId, userRole } = useAuth();
  const {
    data: projects,
    isLoading,
    isError,
  } = useUserProjects(Number(userId), userRole, filters);

  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref, { direction: "vertical" });

  if (isLoading) return <InlineLoader />;

  if (isError || !projects) return <p>Error loading projects</p>;

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      className="overflow-y-auto max-h-[200px] project-list-scrollbar"
      style={{
        direction: "rtl",
      }}
    >
      <ul
        className="space-y-2"
        style={{
          direction: "ltr",
        }}
      >
        {projects.map((project) => (
          <ProjectNavigationItem key={project.id} project={project} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectNavigationList;
