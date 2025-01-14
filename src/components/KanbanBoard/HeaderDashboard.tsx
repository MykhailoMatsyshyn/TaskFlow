// import Filters from "../Filters/Filters";
import BoardFilters from "./BoardFilters";

const HeaderDashboard = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Project Office</h1>
      <h1 className="text-xl font-bold">Status</h1>
      <BoardFilters />
    </header>
  );
};

export default HeaderDashboard;
