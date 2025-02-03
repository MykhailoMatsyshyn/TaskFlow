import useUserStore from "../../stores/userStore";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import UserIcon from "../UserIcon/UserIcon";
import BurgerButton from "./BurgerButton";

const Header = ({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const { currentUser } = useUserStore();

  return (
    <div className="flex items-center justify-between">
      {/* Анімований бургер-батон, який оновлюється при зміні стану сайдбару */}
      <div className="block xl:hidden">
        <BurgerButton isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Правий блок з темою та користувачем */}
      <div className="flex items-center gap-6 font-medium text-[14px] tracking-[-0.02em] ml-auto">
        <ThemeSwitcher />
        <div className="flex items-center gap-2 text-text">
          <span>{currentUser ? currentUser.name : "Guest"}</span>
          <UserIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
