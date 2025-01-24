import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const shouldApplyScrollbar =
    location.pathname === "/dashboard" ||
    location.pathname === "/dashboard/users";

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
        className={`py-5 pl-5 overflow-auto ${
          shouldApplyScrollbar ? "main-custom-scrollbar" : ""
        } overflow-x-hidden xl:col-start-2 xl:row-start-2 relative`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import { useState } from "react";

// const Layout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   return (
//     // <div className="grid h-screen bg-background text-white lg:grid-cols-layout lg:grid-rows-layout">
//     <div className="grid grid-cols-2 bg-background text-white">
//       {/* Sidebar */}
//       {/* <aside
//         className={` transition-transform fixed lg:relative z-50 ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 w-64 h-full`}
//       > */}
//       <aside
//       // className={` transition-transform fixed lg:relative z-50 ${
//       //   isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//       // } lg:translate-x-0 w-64 h-full`}
//       >
//         <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       </aside>

//       {/* Header */}
//       {/* <header className="bg-gray-800 row-start-1 row-end-2 col-start-1 lg:col-start-2 col-end-3 lg:col-end-3"> */}
//       {/* <header className="bg-background-secondary p-4 flex justify-between items-center row-start-1 row-end-2 col-start-1 lg:col-start-2 col-end-3 lg:col-end-3"> */}
//       <header className=" ">
//         <Header toggleSidebar={toggleSidebar} />
//       </header>

//       {/* Main Content */}
//       {/* <main className="overflow-hidden p-4 row-start-2 row-end-3 col-start-1 lg:col-start-2 col-end-3"> */}
//       <main className="">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default Layout;
