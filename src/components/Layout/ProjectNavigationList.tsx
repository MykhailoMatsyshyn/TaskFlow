import useUserStore from "../../stores/userStore";
import useProjectFilterStore from "../../stores/ProjectFilterStore";
import { useRef } from "react";
import useDraggableScroll from "use-draggable-scroll";
import ProjectNavigationItem from "./ProjectNavigationItem";
import { useFetchUserProjects } from "../../hooks/useFetchUserProjects";
import InlineLoader from "../Loaders/InlineLoader";

const ProjectNavigationList = () => {
  const { currentUser } = useUserStore();
  const filters = useProjectFilterStore((state) => state.filters);

  const {
    data: projects,
    isLoading,
    isError,
  } = useFetchUserProjects(currentUser?.id, filters);

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
