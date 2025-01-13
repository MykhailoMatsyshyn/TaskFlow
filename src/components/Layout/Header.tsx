import useUserStore from "../../stores/userStore";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import UserIcon from "../UserIcon/UserIcon";

const Header = () => {
  const { currentUser } = useUserStore();

  return (
    <header className="bg-background-secondary p-4 flex justify-between items-center">
      <div className="container">
        <ThemeSwitcher />
        <div className="flex gap-2">
          <span>{currentUser ? currentUser.name : "Guest"}</span>
          <UserIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
