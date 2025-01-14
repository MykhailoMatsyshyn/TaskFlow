import { useState } from "react";
import Card from "./Card";

const Column = ({ column, onDelete }) => {
  const [tasks, setTasks] = useState(column.tasks);

  const addCard = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="flex flex-col bg-white p-4 rounded shadow-md w-64">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">{column.title}</h3>
        <button onClick={onDelete}>Delete</button>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[70vh]">
        {tasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </div>
      <button
        className="bg-blue-500 text-white rounded px-2 py-1 mt-2"
        onClick={() => addCard({ id: Date.now(), title: "New Task" })}
      >
        Add another card
      </button>
    </div>
  );
};

export default Column;
