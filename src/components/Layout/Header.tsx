import useUserStore from "../../stores/userStore";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import UserIcon from "../UserIcon/UserIcon";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { currentUser } = useUserStore();

  return (
    // <header className="bg-background-secondary p-4 flex justify-between items-center row-start-1 row-end-2 col-start-1 lg:col-start-2 col-end-3 lg:col-end-3">
    <div className="container flex">
      <ThemeSwitcher />
      <button onClick={toggleSidebar} className="ml-4 block xl:hidden">
        Toggle Sidebar
      </button>

      <div className="flex gap-2">
        <span>{currentUser ? currentUser.name : "Guest"}</span>
        <UserIcon />
      </div>
    </div>
    // </header>
  );
};

export default Header;
