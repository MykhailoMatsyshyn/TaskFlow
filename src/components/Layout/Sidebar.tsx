import { Link } from "react-router-dom";
import LogoWithTitle from "../LogoWithTitle/LogoWithTitle";
import LogOut from "./components/LogOut/LogOut";
import useUserStore from "../../stores/userStore";
import CreateBoard from "./CreateBoard";
import ProjectNavigationList from "./ProjectNavigationList";

import { MdOutlineDashboard } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { currentUser } = useUserStore();

  return (
    <>
      {/* Накладка */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-4 xl:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Сайдбар */}
      <div
        className={`fixed xl:static top-0 left-0 h-full  xl:h-screen w-[225px] md:w-[260px] bg-background-highlight z-5 transform transition-transform duration-300 pt-[14px] pb-6 flex flex-col ${`${
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

            {/* інша навігація */}
            <ul className="text-white/50 ">
              <li className="mt-[14px] flex gap-2 items-center">
                <MdOutlineDashboard size={18} className="fill-white/50" />
                <Link to="/dashboard">Main Dashboard</Link>{" "}
                {/* Перехід до Dashboard */}
              </li>
              {currentUser?.role === "Admin" && (
                <li className="mt-[14px] flex gap-2 items-center">
                  <FaUsersCog size={18} className="fill-white/50" />
                  <Link to="/dashboard/users">User Management</Link>{" "}
                  {/* Перехід до менеджменту користувачів */}
                </li>
              )}
            </ul>

            <p className="font-normal text-xs tracking-[-0.02em] text-white/50 mt-[40px]">
              My boards
            </p>
            <hr className="border-white/10 mt-2" />

            {/* Відображення CreateBoard тільки для Admin або Project Manager */}
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
