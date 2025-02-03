import { Droppable, Draggable } from "@hello-pangea/dnd";
import Card from "../Card/Card";
import ColumnActions from "./components/ColumnActions";
import AddTaskButton from "../Buttons/AddTaskButton";
import TaskSkeleton from "../../../Loaders/TaskSkeleton";

/**
 * Column Component
 *
 * Represents a single column in the Kanban board, containing tasks.
 * Supports drag-and-drop reordering of tasks and provides actions for
 * editing or deleting the column.
 */
const Column = ({ projectId, column, columns, tasks, tasksLoading }) => {
  return (
    <div className="flex flex-col w-[335px] h-full  text-[14px] tracking-[-0.02em]">
      {/* Column Header with Title & Actions */}
      <div className="flex justify-between items-center h-[56px] w-[335px] px-5 py-[18px] mb-[14px] rounded-lg bg-background-highlight">
        <h3 className="text-text font-light">{column.title}</h3>
        <ColumnActions
          projectId={projectId}
          column={column}
          existingColumnTitles={columns.map((col) => col.title)}
        />
      </div>

      {/* Droppable Zone for Tasks */}
      <Droppable droppableId={column.id} type="TASK">
        {(provided, snapshot) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col pr-[8px] mr-[-16px] overflow-y-auto overflow-x-hidden h-full custom-scrollbar"
          >
            {tasksLoading ? (
              <div className="flex flex-col gap-2">
                <TaskSkeleton />
                <TaskSkeleton />
              </div>
            ) : (
              <div
                className={`w-[335px] relative ${
                  snapshot.isDraggingOver ? "droppable-hover" : ""
                }`}
              >
                {tasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card task={task} isDragging={snapshot.isDragging} />
                      </li>
                    )}
                  </Draggable>
                ))}

                {/* Keeps the layout stable while dragging */}
                {provided.placeholder}
              </div>
            )}
          </ul>
        )}
      </Droppable>

      {/* Button to Add a New Task */}
      <div className="mt-auto">
        <AddTaskButton status={column.id} projectId={projectId} />
      </div>
    </div>
  );
};

export default Column;
