import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const shouldApplyScrollbar =
    location.pathname === "/dashboard" || location.pathname === "/users";

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="h-screen bg-background text-white xl:grid xl:grid-cols-[260px_1fr] xl:grid-rows-[68px_1fr]">
      <aside className="xl:col-span-1 xl:row-span-2">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </aside>

      <header className="p-4 bg-background-secondary h-[60px] xl:col-start-2 xl:row-start-1 xl:h-[68px]">
        <Header toggleSidebar={toggleSidebar} />
      </header>

      <main
        className={`py-5 pl-5 overflow-y-hidden ${
          shouldApplyScrollbar ? "main-custom-scrollbar overflow-y-visible" : ""
        } overflow-x-hidden xl:col-start-2 xl:row-start-2 relative`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
