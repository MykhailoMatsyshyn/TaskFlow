import { Link } from "react-router-dom";
import LogoWithTitle from "../LogoWithTitle/LogoWithTitle";
import LogOut from "./components/LogOut/LogOut";
import useUserStore from "../../stores/userStore";

const Sidebar = () => {
  const { currentUser } = useUserStore();

  return (
    <div className="w-60 bg-background-highlight p-5">
      <LogoWithTitle />

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
  );
};

export default Sidebar;
