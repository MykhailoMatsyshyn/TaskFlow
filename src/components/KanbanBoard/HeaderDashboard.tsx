// import Filters from "../Filters/Filters";
import AddColumnButton from "./AddColumnButton";
import BoardFilters from "./BoardFilters";

const HeaderDashboard = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Project Office</h1>
      <h1 className="text-xl font-bold">Status</h1>
      <BoardFilters />
      <AddColumnButton />
    </header>
  );
};

export default HeaderDashboard;
