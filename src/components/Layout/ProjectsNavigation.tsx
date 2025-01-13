import { Tooltip } from "react-tippy";
import { Icon } from "../Icon/Icon";
import EllipsisText from "react-ellipsis-text";
import "react-tippy/dist/tippy.css";

const ProjectNavigation = ({ projects, onEdit, onDelete, userRole }) => {
  const theme = localStorage.getItem("theme");
  console.log(theme);

  const canEditOrDelete = (role) => {
    return role === "Admin" || role === "Project Manager";
  };

  return (
    <div>
      {projects.map((project) => (
        <div
          key={project.id}
          className={`relative flex justify-between items-center pl-[14px] py-[22px] px-[14px] h-[61px] ${
            project.active &&
            "bg-[#1F1F1F] after:content-[''] after:block after:bg-[#BEDBB0] after:rounded-l-md after:w-[4px] after:h-[61px] after:absolute after:right-0 after:top-[calc(50%-30.5px)]"
          }`}
        >
          <div className="flex items-center">
            <Icon
              id={project.icon}
              size={18}
              className={`fill-none mr-1 ${
                project.active ? "stroke-white" : "stroke-white/50"
              }`}
            />
            {/* <p
              className={`font-medium text-sm tracking-[-0.02em] ${
                project.active ? "text-white" : "text-white/50"
              }`}
            > */}
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
                  project.active ? "text-white" : "text-gray-500"
                }`}
              />
            </Tooltip>
            {/* <EllipsisText
                text={project.title}
                length={10}
                className={`text-sm font-medium ${
                  project.active ? "text-white" : "text-gray-500"
                }`}
              /> */}
            {/* </p> */}
          </div>
          {project.active && canEditOrDelete(userRole) && (
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
      ))}
    </div>
  );
};

export default ProjectNavigation;
