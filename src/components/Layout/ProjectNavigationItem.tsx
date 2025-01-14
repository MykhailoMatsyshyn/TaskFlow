import { Tooltip } from "react-tippy";
import { Icon } from "../Icon/Icon";
import { Link, useLocation } from "react-router-dom";
import { kebabCase } from "lodash";
import EllipsisText from "react-ellipsis-text";
import "react-tippy/dist/tippy.css";
import useUserStore from "../../stores/userStore";

const ProjectNavigationItem = ({ project, userRole, onEdit, onDelete }) => {
  const location = useLocation(); // Отримуємо поточний шлях
  const theme = localStorage.getItem("theme");
  const { currentUser } = useUserStore();

  console.log("currentUser", currentUser);
  console.log("currentUser.role", currentUser.role);

  const role = currentUser?.role;

  console.log("role", role);

  // Логіка визначення, чи проект активний
  const isActive =
    location.pathname ===
    `/dashboard/${encodeURIComponent(kebabCase(project.title))}`;

  console.log("project.title", kebabCase(project.title));

  const canEditOrDelete = (role) => {
    console.log("project.canEditOrDelete", role);
    return role === "Admin" || role === "Project Manager";
  };

  console.log("canEditOrDelete", canEditOrDelete(role));

  return (
    <li className="list-none scroll-snap-start">
      <Link
        to={`/dashboard/${kebabCase(project.title)}`} // Генеруємо посилання на проект
        className="block"
      >
        <div
          className={`relative flex justify-between items-center pl-[14px] py-[22px] px-[14px] h-[61px] hover:bg-[#1f1f1f] ${
            isActive
              ? "bg-[#1F1F1F] after:content-[''] after:block after:bg-[#BEDBB0] after:rounded-l-md after:w-[4px] after:h-[61px] after:absolute after:right-0 after:top-[calc(50%-30.5px)]"
              : ""
          }`}
        >
          <div className="flex items-center">
            <Icon
              id={project.icon}
              size={18}
              className={`fill-none mr-2 ${
                isActive ? "stroke-white" : "stroke-white/50"
              }`}
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
                <Icon
                  id="edit"
                  size={16}
                  className="fill-none stroke-white/50"
                />
              </button>
              <button onClick={() => onDelete(project.id)}>
                <Icon
                  id="trash2"
                  size={16}
                  className="fill-none stroke-white/50"
                />
              </button>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
};

export default ProjectNavigationItem;
