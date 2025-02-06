import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { useState } from "react";
import Header from "./Header/Header";

/**
 * Layout Component
 *
 * This component serves as the main layout wrapper for authenticated users.
 * It includes a **Sidebar**, **Header**, and a dynamic **Outlet** for nested routes.
 *
 * Features:
 * - Controls sidebar state (open/close).
 * - Dynamically applies custom scrolling styles for specific routes.
 * - Ensures structured layout with grid-based organization.
 *
 * @returns {JSX.Element} - The layout structure for the dashboard and other private routes.
 */
const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Determines if a scrollbar should be applied based on the current route
  const shouldApplyScrollbar =
    location.pathname === "/dashboard" || location.pathname === "/users";

  // Toggles the sidebar open/close state
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="h-screen bg-background text-white xl:grid xl:grid-cols-[260px_1fr] xl:grid-rows-[68px_1fr] overflow-hidden">
      {/* Sidebar - Always present but toggleable */}
      <aside className="xl:col-span-1 xl:row-span-2">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </aside>

      {/* Header - Positioned at the top */}
      <header className="py-4 px-[20px] bg-background-secondary h-[60px] xl:col-start-2 xl:row-start-1 md:h-[68px]">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </header>

      {/* Main content area where nested routes are rendered */}
      <main
        className={`py-5 pl-0 mb-5 overflow-y-hidden ${
          shouldApplyScrollbar ? "main-custom-scrollbar overflow-y-visible" : ""
        } overflow-x-hidden h-full xl:col-start-2 xl:row-start-2 relative`}
      >
        <Outlet /> {/* Placeholder for nested routes */}
      </main>
    </div>
  );
};

export default Layout;
