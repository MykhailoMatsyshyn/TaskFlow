import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  SidebarHeader,
  SidebarNavigation,
  SidebarBoards,
  SidebarFooter,
  SidebarOverlay,
} from "./components";

/**
 * Sidebar component with navigation links, project management, and logout functionality.
 *
 * @param {boolean} isOpen - Sidebar visibility state (for mobile).
 * @param {() => void} toggleSidebar - Function to toggle sidebar visibility.
 */
const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const location = useLocation();
  const [isXLScreen, setIsXLScreen] = useState(window.innerWidth >= 1440);

  useEffect(() => {
    const handleResize = () => setIsXLScreen(window.innerWidth >= 1440);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Background overlay for mobile */}
      <SidebarOverlay
        isOpen={isOpen && !isXLScreen}
        toggleSidebar={toggleSidebar}
      />

      <AnimatePresence>
        {(isXLScreen || isOpen) && (
          <motion.div
            className="fixed xl:static top-0 left-0 h-full xl:h-screen w-[225px] md:w-[260px] bg-background-highlight z-[10] flex flex-col pt-[14px] pb-6"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <SidebarHeader />
            <SidebarNavigation currentPath={location.pathname} />
            <SidebarBoards />
            <SidebarFooter />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
