import useUserStore from "../../stores/userStore";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

const Header = () => {
  const { currentUser } = useUserStore();

  return (
    <header className="bg-background-secondary p-4 flex justify-between items-center">
      <div>
        <ThemeSwitcher />
        <span>{currentUser ? currentUser.name : "Guest"}</span>{" "}
      </div>
    </header>
  );
};

export default Header;
