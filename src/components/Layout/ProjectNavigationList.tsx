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

  const handleEdit = (id) => {
    console.log("Edit project with id:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete project with id:", id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError || !projects) return <p>Error loading projects</p>;

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      className="overflow-y-auto max-h-[200px] scrollbar-thin scrollbar-thumb-[#BEDBB0] scrollbar-track-[#1F1F1F] scroll-snap-y scroll-snap-mandatory"
    >
      <ul className="space-y-2">
        {projects.data.map((project) => (
          <ProjectNavigationItem
            key={project.id}
            project={project}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProjectNavigationList;
