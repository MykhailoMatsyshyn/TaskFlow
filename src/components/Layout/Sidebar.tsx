import { Link } from "react-router-dom";
import LogoWithTitle from "../LogoWithTitle/LogoWithTitle";
import LogOut from "./components/LogOut/LogOut";
import useUserStore from "../../stores/userStore";
// import { Icon } from "../Icon/Icon";
import CreateBoard from "./CreateBoard";
import ProjectNavigation from "./ProjectsNavigation";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { currentUser } = useUserStore();

  const pseudoProjects = [
    {
      id: 1,
      title: "Project office",
      icon: "project", // Іконка для проекту
      active: true, // Чи є проект активним (для редагування/видалення)
    },
    {
      id: 2,
      title: "Neon Light Projecttts",
      icon: "puzzle",
      active: false,
    },
  ];

  const handleEdit = (id) => {
    console.log("Edit project with id:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete project with id:", id);
  };

  return (
    <>
      {/* Накладка */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40`}
          onClick={toggleSidebar}
          role="button"
          tabIndex={0}
          onKeyDown={toggleSidebar}
          aria-label="Close sidebar"
        />
      )}

      {/* Сайдбар */}
      <div
        className={`fixed top-0 left-0 h-full w-[225px] bg-background-highlight z-50 transform transition-transform duration-300 pt-[14px] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-[14px]">
          <LogoWithTitle />

          <p className="font-normal text-xs tracking-[-0.02em] text-white/50 mt-[70px]">
            My boards
          </p>
          <hr className="border-white/10 mt-2" />

          {/* Відображення CreateBoard тільки для Admin або Project Manager */}
          {(currentUser?.role === "Admin" ||
            currentUser?.role === "Project Manager") && <CreateBoard />}
        </div>

        {/* Інтеграція ProjectNavigation */}
        <ProjectNavigation
          projects={pseudoProjects}
          onEdit={handleEdit}
          onDelete={handleDelete}
          userRole={currentUser?.role}
        />

        {/* Список проектів або інша навігація */}
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link> {/* Перехід до Dashboard */}
          </li>
          {currentUser?.role === "Admin" && (
            <li>
              <Link to="/dashboard/users">User Management</Link>{" "}
              {/* Перехід до менеджменту користувачів */}
            </li>
          )}
        </ul>

        <LogOut />
      </div>
    </>
  );
};

export default Sidebar;
