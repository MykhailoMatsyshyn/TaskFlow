import { useState } from "react";
import Column from "./Column";
import AddColumnButton from "./AddColumnButton";

const MainDashboard = () => {
  const [columns, setColumns] = useState([]);

  const addColumn = (title) => {
    setColumns([...columns, { id: Date.now(), title, tasks: [] }]);
  };

  return (
    <div className="">
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          onDelete={() =>
            setColumns(columns.filter((col) => col.id !== column.id))
          }
        />
      ))}
      <AddColumnButton />
    </div>
  );
};

export default MainDashboard;
