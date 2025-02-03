import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LogoWithTitle from "../LogoWithTitle/LogoWithTitle";
import LogOut from "./components/LogOut/LogOut";
import useUserStore from "../../stores/userStore";
import CreateBoard from "./CreateBoard";
import ProjectNavigationList from "./ProjectNavigationList";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import ProjectFilterManager from "../FilterManager/ProjectFilterManager";
import { useEffect, useState } from "react";

// Variants for animation (only for mobile)
const sidebarVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: "0%",
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const { currentUser } = useUserStore();
  const location = useLocation();

  // State to track if screen is xl (to avoid animation)
  const [isXLScreen, setIsXLScreen] = useState(window.innerWidth >= 1440);

  // Update screen size state on resize
  useEffect(() => {
    const handleResize = () => {
      setIsXLScreen(window.innerWidth >= 1440);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Background overlay for mobile */}
      <AnimatePresence>
        {!isXLScreen && isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-[5] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar container */}
      <AnimatePresence>
        {(isXLScreen || isOpen) && (
          <motion.div
            className={`fixed xl:static top-0 left-0 h-full xl:h-screen w-[225px] md:w-[260px] bg-background-highlight z-[10] flex flex-col pt-[14px] pb-6 ${
              isXLScreen ? "translate-x-0 opacity-100" : ""
            }`}
            variants={isXLScreen ? undefined : sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex-grow">
              <div className="px-[14px]">
                <LogoWithTitle />

                <p className="font-normal text-xs tracking-[-0.02em] text-text opacity-50 mt-[40px]">
                  My navigation
                </p>
                <hr className="text-text opacity-50 mt-2" />

                <ul className="text-text">
                  <li
                    className={`mt-[14px] flex gap-2 items-center ${
                      location.pathname === "/dashboard"
                        ? "text-text"
                        : "opacity-50"
                    }`}
                  >
                    <MdOutlineDashboard
                      size={18}
                      className={`${
                        location.pathname === "/dashboard"
                          ? "fill-text"
                          : "fill-text opacity-50"
                      }`}
                    />
                    <Link
                      to="/dashboard"
                      className={
                        location.pathname === "/dashboard" ? "text-text" : ""
                      }
                    >
                      Main Dashboard
                    </Link>
                  </li>
                  {currentUser?.role === "Admin" && (
                    <li
                      className={`mt-[14px] flex gap-2 items-center ${
                        location.pathname === "/users"
                          ? "text-text"
                          : "opacity-50"
                      }`}
                    >
                      <FaUsersCog
                        size={18}
                        className={`${
                          location.pathname === "/users"
                            ? "fill-text"
                            : "fill-text opacity-50"
                        }`}
                      />
                      <Link
                        to="/users"
                        className={
                          location.pathname === "/users" ? "text-text" : ""
                        }
                      >
                        User Management
                      </Link>
                    </li>
                  )}
                </ul>

                <div className="flex justify-between mt-[40px]">
                  <p className="font-normal text-xs tracking-[-0.02em] text-text opacity-50">
                    My boards
                  </p>
                  <ProjectFilterManager />
                </div>
                <hr className="text-text opacity-50 mt-2" />

                {(currentUser?.role === "Admin" ||
                  currentUser?.role === "Project Manager") && <CreateBoard />}
              </div>
              <ProjectNavigationList />
            </div>

            <LogOut />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
