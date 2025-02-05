import useUserStore from "../../../stores/auth/userStore";
import BurgerButton from "../../UI/BurgerButton";
import ThemeSwitcher from "../../UI/ThemeSwitcher";
import UserIcon from "../../UI/UserIcon";

/**
 * Header Component
 *
 * This component serves as the top navigation bar of the application.
 * It contains a sidebar toggle button, a theme switcher, and a user profile section.
 *
 * Features:
 * - Displays a **BurgerButton** to toggle the sidebar (visible on smaller screens).
 * - Includes a **ThemeSwitcher** to allow users to toggle between light and dark modes.
 * - Shows the **UserIcon** and the current user's name (or "Guest" if not logged in).
 *
 * @param {boolean} isSidebarOpen - Sidebar visibility state.
 * @param {() => void} toggleSidebar - Function to open/close the sidebar.
 * @returns {JSX.Element} - The rendered header component.
 */
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
      {/* Animated burger button for toggling the sidebar (visible on mobile) */}
      <div className="block xl:hidden">
        <BurgerButton isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Right section with theme switcher and user info */}
      <div className="flex items-center gap-6 font-medium text-[14px] tracking-[-0.02em] ml-auto">
        <ThemeSwitcher />
        <div className="flex items-center gap-2 text-text">
          {/* Displays the current user's name or "Guest" if not logged in */}
          <span>{currentUser ? currentUser.name : "Guest"}</span>
          <UserIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
