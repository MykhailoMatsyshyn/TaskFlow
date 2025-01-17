import { useState } from "react";
import { Tooltip } from "react-tippy";
import { CustomIcon } from "../CustomIcon/CustomIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { kebabCase } from "lodash";
import EllipsisText from "react-ellipsis-text";
import "react-tippy/dist/tippy.css";
import useUserStore from "../../stores/userStore";
import CustomModal from "../CustomModal/CustomModal";
import { useDeleteProject } from "../../hooks/useDeleteProject";

const ProjectNavigationItem = ({ project, userRole, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан модалки
  const location = useLocation();
  const theme = localStorage.getItem("theme");
  const { currentUser } = useUserStore();
  const { mutate: deleteProject } = useDeleteProject();
  const navigate = useNavigate();

  const role = currentUser?.role;

  const isActive =
    location.pathname ===
    `/dashboard/${encodeURIComponent(kebabCase(project.title))}`;

  const canEditOrDelete = (role) =>
    role === "Admin" || role === "Project Manager";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDeleteConfirm = () => {
    deleteProject(project.id);
    console.log("navigate here");
    navigate("/dashboard");
    closeModal();
  };

  return (
    <li className="list-none scroll-snap-start">
      <Link to={`/dashboard/${kebabCase(project.title)}`} className="block">
        <div
          className={`relative flex justify-between items-center pl-[14px] py-[22px] px-[14px] h-[61px] hover:bg-[#1f1f1f] ${
            isActive
              ? `bg-[#1F1F1F] after:content-[''] after:block after:rounded-l-md after:w-[4px] after:h-[61px] after:absolute after:right-0 after:top-[calc(50%-30.5px)] ${
                  project.status === "Planned"
                    ? "after:bg-[#8FA1D0]"
                    : project.status === "In Progress"
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
              color={isActive ? "#fff" : "rgba(255, 255, 255, 0.5)"}
            />
            <Tooltip
              title={project.title.length > 18 ? project.title : " "}
              theme={theme === "dark" ? "dark" : "light"}
              position="top"
              animation="fade"
              trigger="mouseenter"
            >
              <EllipsisText
                text={project.title}
                length={18}
                className={`text-sm font-medium tracking-[-0.02em] ${
                  isActive ? "text-white" : "text-white/50"
                }`}
              />
            </Tooltip>
          </div>
          {isActive && canEditOrDelete(role) && (
            <div className="flex gap-2">
              <button onClick={() => onEdit(project.id)}>
                <CustomIcon
                  id="edit"
                  size={16}
                  className="fill-none stroke-white/50"
                />
              </button>
              <button onClick={openModal}>
                <CustomIcon
                  id="trash2"
                  size={16}
                  className="fill-none stroke-white/50"
                />
              </button>
            </div>
          )}
        </div>
      </Link>

      {/* Модалка підтвердження видалення */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Confirm Deletion"
      >
        <p>Are you sure you want to delete the project "{project.title}"?</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </CustomModal>
    </li>
  );
};

export default ProjectNavigationItem;
