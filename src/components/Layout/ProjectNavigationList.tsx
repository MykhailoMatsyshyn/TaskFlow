import useFetchUserProjects from "../../hooks/useFetchUserProjects";
import useUserStore from "../../stores/userStore";
import { useRef } from "react";
import useDraggableScroll from "use-draggable-scroll";
import ProjectNavigationItem from "./ProjectNavigationItem";

const ProjectNavigationList = () => {
  const { currentUser } = useUserStore();
  const {
    data: projects,
    isLoading,
    isError,
  } = useFetchUserProjects(currentUser?.id);
  const ref = useRef(null); // Ref для списку
  const { onMouseDown } = useDraggableScroll(ref, { direction: "vertical" }); // Drag-to-scroll

  console.log("ProjectNavigationList projects:", projects);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !projects) return <p>Error loading projects</p>;

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      className="overflow-y-auto max-h-[200px]  custom-scrollbar"
      style={{
        direction: "rtl", // Інверсія напрямку
      }}
    >
      <ul
        className="space-y-2"
        style={{
          direction: "ltr", // Відновлення нормального напрямку для контенту
        }}
      >
        {projects.data.map((project) => (
          <ProjectNavigationItem key={project.id} project={project} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectNavigationList;
