import { useState } from "react";
import Column from "./Column";

const MainDashboard = () => {
  const [columns, setColumns] = useState([]);

  const addColumn = (title) => {
    setColumns([...columns, { id: Date.now(), title, tasks: [] }]);
  };

  return (
    <div className="flex gap-4 p-4 overflow-x-auto bg-gray-100 h-full">
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          onDelete={() =>
            setColumns(columns.filter((col) => col.id !== column.id))
          }
        />
      ))}
      <button
        className="min-w-[200px] bg-blue-500 text-white rounded px-4 py-2"
        onClick={() => addColumn("New Column")}
      >
        Add Column
      </button>
    </div>
  );
};

export default MainDashboard;
