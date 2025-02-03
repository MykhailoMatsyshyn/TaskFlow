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
    <div className="h-screen bg-background text-white xl:grid xl:grid-cols-[260px_1fr] xl:grid-rows-[68px_1fr] overflow-hidden">
      <aside className="xl:col-span-1 xl:row-span-2">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </aside>

      <header className="py-4 px-[20px] bg-background-secondary h-[60px] xl:col-start-2 xl:row-start-1 xl:h-[68px]">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </header>

      <main
        className={`py-5 pl-0 overflow-y-hidden ${
          shouldApplyScrollbar ? "main-custom-scrollbar overflow-y-visible" : ""
        } overflow-x-hidden h-full xl:col-start-2 xl:row-start-2 relative`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
