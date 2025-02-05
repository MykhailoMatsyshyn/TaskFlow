import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import useUserStore from "../../../../stores/auth/userStore";

interface SidebarNavigationProps {
  currentPath: string;
}

/** Navigation links for Sidebar */
const SidebarNavigation = ({ currentPath }: SidebarNavigationProps) => {
  const { currentUser } = useUserStore();

  return (
    <ul className="text-text px-[14px]">
      <li
        className={`mt-[14px] flex gap-2 items-center ${
          currentPath === "/dashboard" ? "text-text" : "opacity-50"
        }`}
      >
        <MdOutlineDashboard size={18} />
        <Link to="/dashboard">Main Dashboard</Link>
      </li>
      {currentUser?.role === "Admin" && (
        <li
          className={`mt-[14px] flex gap-2 items-center ${
            currentPath === "/users" ? "text-text" : "opacity-50"
          }`}
        >
          <FaUsersCog size={18} />
          <Link to="/users">User Management</Link>
        </li>
      )}
    </ul>
  );
};

export default SidebarNavigation;
