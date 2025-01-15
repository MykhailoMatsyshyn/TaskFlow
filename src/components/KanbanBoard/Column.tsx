import { Droppable, Draggable } from "@hello-pangea/dnd";
import Card from "./Card";
import { Task } from "../../types/task";
import AddCardButton from "./AddCardButton";
import { Icon } from "../Icon/Icon";

const Column = ({
  column,
  tasks,
}: {
  column: { id: string; title: string };
  tasks: Task[];
}) => {
  console.log(`Column ${column}`);

  return (
    <div className="flex flex-col w-[347px] h-full font-medium text-[14px] tracking-[-0.02em]">
      {/* Заголовок і кнопки */}
      <div className="flex justify-between items-center h-[56px] w-[335px] px-5 py-[18px] mb-[14px] rounded-lg bg-[#121212]">
        <h3 className="font-bold ">{column.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => console.log("✏️", column.id)}
            className="text-blue-500"
          >
            <Icon id="edit" size={16} className="fill-none stroke-white/50" />
          </button>
          <button
            onClick={() => console.log("🗑️", column.id)}
            className="text-red-500"
          >
            <Icon id="trash2" size={16} className="fill-none stroke-white/50" />
          </button>
        </div>
      </div>

      {/* Список задач */}
      <Droppable droppableId={column.id} type="TASK">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-2 overflow-y-auto max-h-[64vh] custom-scrollbar"
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

      {/* Кнопка додавання задач */}
      <div className="mt-auto">
        <AddCardButton />
      </div>
    </div>
  );
};

export default Column;
