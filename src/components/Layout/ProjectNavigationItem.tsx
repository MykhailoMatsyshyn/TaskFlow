import { useState } from "react";
import { Tooltip } from "react-tippy";
import { CustomIcon } from "../CustomIcon/CustomIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { kebabCase } from "lodash";
import "react-tippy/dist/tippy.css";
import useUserStore from "../../stores/userStore";
import CustomModal from "../CustomModal/CustomModal";
import { useDeleteProject } from "../../hooks/useDeleteProject";
import { ProjectForm } from "../Forms";
import { useUpdateProject } from "../../hooks/useUpdateProject";
import DeleteModal from "../Modals/DeleteModal";
import ActionButtons from "../ActionButtons";

/**
 * Component representing a single project navigation item.
 */
const ProjectNavigationItem = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const location = useLocation();
  const { currentUser } = useUserStore();
  const { mutate: deleteProject } = useDeleteProject();
  const { mutate: updateProject } = useUpdateProject();
  const navigate = useNavigate();

  const role = currentUser?.role;

  // Check if the current project is active
  const isActive =
    location.pathname ===
    `/dashboard/${encodeURIComponent(kebabCase(project.title))}`;

  // Function to check if the user can edit or delete the project
  const canEditOrDelete = (role) =>
    role === "Admin" || role === "Project Manager";

  // Modal controls
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openEditModal = (project) => {
    console.log(project);
    setSelectedProject(project);
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedProject(null);
    setEditModalOpen(false);
  };

  // Handle project deletion
  const handleDeleteConfirm = () => {
    deleteProject(project.id, {
      onSuccess: () => {
        // Redirect after successful deletion
        navigate("/dashboard");
      },
    });
    closeModal();
  };

  const handleEdit = (updatedData) => {
    if (!selectedProject?.id) {
      console.error("Project ID is undefined!");
      return;
    }

    const dataWithId = {
      id: selectedProject.id,
      data: updatedData,
    };

    console.log(selectedProject);

    updateProject(dataWithId, {
      onSuccess: (updatedProject) => {
        const newSlug = kebabCase(updatedProject.title);
        const currentSlug = kebabCase(selectedProject.title);

        if (newSlug !== currentSlug) {
          navigate(`/dashboard/${encodeURIComponent(newSlug)}`);
        }

        closeEditModal();
      },
      onError: (error) => {
        console.error("Failed to update project:", error.message);
      },
    });
  };

  const maxTitleLength = isActive ? 18 : 28;
  const truncatedTitle =
    project.title.length > maxTitleLength
      ? `${project.title.slice(0, maxTitleLength)}…`
      : project.title;

  return (
    <li className="list-none scroll-snap-start">
      <Link to={`/dashboard/${kebabCase(project.title)}`} className="block">
        <div
          className={`relative flex justify-between items-center pl-[14px] py-[22px] px-[14px] h-[61px] hover:bg-background ${
            isActive
              ? `bg-background after:content-[''] after:block after:rounded-l-md after:w-[4px] after:h-[61px] after:absolute after:right-0 after:top-[calc(50%-30.5px)] ${
                  project.status === "planned"
                    ? "after:bg-[#8FA1D0]"
                    : project.status === "in-progress"
                    ? "after:bg-[#E09CB5]"
                    : "after:bg-[#BEDBB0]"
                }`
              : ""
          }`}
        >
          <div className="flex items-center">
            <CustomIcon
              id={project.icon}
              size={18}
              className={`mr-2`}
              color={
                isActive ? "var(--text-color)" : "var(--text-color-transparent)"
              }
            />
            {project.title.length > maxTitleLength ? (
              <Tooltip title={project.title}>
                <p
                  className={`text-sm font-medium tracking-[-0.02em] block truncate ${
                    isActive
                      ? "text-text max-w-[120px] md:max-w-[150px]"
                      : "text-text opacity-50 max-w-[167px] md:max-w-[200px]"
                  }`}
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {truncatedTitle}
                </p>
              </Tooltip>
            ) : (
              <span
                className={`text-sm font-medium tracking-[-0.02em] ${
                  isActive ? "text-text" : "text-text opacity-50"
                }`}
              >
                {project.title}
              </span>
            )}
          </div>
          {isActive && canEditOrDelete(role) && (
            <ActionButtons
              onEdit={() => openEditModal(project)}
              onDelete={() => setIsModalOpen(true)}
            />
          )}
        </div>
      </Link>

      {/* Модалка підтвердження видалення */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDeleteConfirm}
        message={`Are you sure you want to delete the project "${project.title}"?`}
      />

      {/* Модалка редагування */}
      {isEditModalOpen && (
        <CustomModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          title="Edit Project"
        >
          <ProjectForm
            initialData={selectedProject}
            onCancel={closeEditModal}
            onSubmit={handleEdit}
          />
        </CustomModal>
      )}
    </li>
  );
};

export default ProjectNavigationItem;
