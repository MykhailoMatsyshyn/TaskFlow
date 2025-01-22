import { Link, useLocation } from "react-router-dom";
import LogoWithTitle from "../LogoWithTitle/LogoWithTitle";
import LogOut from "./components/LogOut/LogOut";
import useUserStore from "../../stores/userStore";
import CreateBoard from "./CreateBoard";
import ProjectNavigationList from "./ProjectNavigationList";

import { MdOutlineDashboard } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { currentUser } = useUserStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[1] xl:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed xl:static top-0 left-0 h-full xl:h-screen w-[225px] md:w-[260px] bg-background-highlight z-[1] transform transition-transform duration-300 pt-[14px] pb-6 flex flex-col ${`${
          isOpen ? "translate-x-0" : "-translate-x-[101%]"
        } xl:translate-x-0`}`}
      >
        <div className="flex-grow">
          <div className="px-[14px]">
            <LogoWithTitle />

            <p className="font-normal text-xs tracking-[-0.02em] text-white/50 mt-[40px]">
              My navigation
            </p>
            <hr className="border-white/10 mt-2" />

            <ul className="text-white/50">
              <li
                className={`mt-[14px] flex gap-2 items-center ${
                  isActive("/dashboard") ? "text-white" : ""
                }`}
              >
                <MdOutlineDashboard
                  size={18}
                  className={`${
                    isActive("/dashboard") ? "fill-white" : "fill-white/50"
                  }`}
                />
                <Link
                  to="/dashboard"
                  className={isActive("/dashboard") ? "text-white" : ""}
                >
                  Main Dashboard
                </Link>
              </li>
              {currentUser?.role === "Admin" && (
                <li
                  className={`mt-[14px] flex gap-2 items-center ${
                    isActive("/dashboard/users") ? "text-white" : ""
                  }`}
                >
                  <FaUsersCog
                    size={18}
                    className={`${
                      isActive("/dashboard/users")
                        ? "fill-white"
                        : "fill-white/50"
                    }`}
                  />
                  <Link
                    to="/dashboard/users"
                    className={isActive("/dashboard/users") ? "text-white" : ""}
                  >
                    User Management
                  </Link>
                </li>
              )}
            </ul>

            <p className="font-normal text-xs tracking-[-0.02em] text-white/50 mt-[40px]">
              My boards
            </p>
            <hr className="border-white/10 mt-2" />

            {(currentUser?.role === "Admin" ||
              currentUser?.role === "Project Manager") && <CreateBoard />}
          </div>
          <ProjectNavigationList />
        </div>

        <LogOut />
      </div>
    </>
  );
};

export default Sidebar;
