import { Droppable, Draggable } from "@hello-pangea/dnd";
import Card from "./Card";
import { Task } from "../../types/task";

const Column = ({
  column,
  tasks,
}: {
  column: { id: string; title: string };
  tasks: Task[];
}) => {
  console.log(`Column ${column}`);

  return (
    <div className="flex flex-col bg-white p-4 rounded shadow-md w-64 h-full">
      <h3 className="font-bold text-yellow-950">{column.title}</h3>
      <Droppable droppableId={column.id} type="TASK">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-2 overflow-y-auto max-h-[70vh]"
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
