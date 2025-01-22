import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Column from "./Column";
import AddColumnButton from "./AddColumnButton";

const KanbanBoard = ({
  projectId,
  columns,
  tasks,
  onColumnUpdate,
  onTaskUpdate,
}) => {
  const handleDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === "COLUMN") {
      const updatedColumns = Array.from(columns);
      const [movedColumn] = updatedColumns.splice(source.index, 1);
      updatedColumns.splice(destination.index, 0, movedColumn);
      onColumnUpdate(updatedColumns);
    } else if (type === "TASK") {
      const sourceColumn = columns.find((col) => col.id === source.droppableId);
      const destinationColumn = columns.find(
        (col) => col.id === destination.droppableId
      );

      if (!sourceColumn || !destinationColumn) return;

      const sourceTasks = [...sourceColumn.tasks];
      const destinationTasks = [...destinationColumn.tasks];
      const [movedTask] = sourceTasks.splice(source.index, 1);

      if (sourceColumn.id === destinationColumn.id) {
        sourceTasks.splice(destination.index, 0, movedTask);
        const updatedColumns = columns.map((col) =>
          col.id === sourceColumn.id ? { ...col, tasks: sourceTasks } : col
        );
        onColumnUpdate(updatedColumns);
      } else {
        destinationTasks.splice(destination.index, 0, movedTask);
        const updatedColumns = columns.map((col) => {
          if (col.id === sourceColumn.id) return { ...col, tasks: sourceTasks };
          if (col.id === destinationColumn.id)
            return { ...col, tasks: destinationTasks };
          return col;
        });
        onColumnUpdate(updatedColumns);
        onTaskUpdate(movedTask.id, { status: destinationColumn.id });
      }
    }
  };

  return (
    <div className="flex overflow-x-auto overflow-y-hidden w-full h-[calc(100vh-164px)] custom-scrollbar">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex"
            >
              {columns.map((column, index) => (
                <Draggable
                  key={column.id}
                  draggableId={column.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="w-[368px]"
                    >
                      <Column
                        projectId={projectId}
                        column={column}
                        tasks={tasks.filter((task) =>
                          column.tasks.includes(task.id)
                        )}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <AddColumnButton projectId={projectId} columns={columns} />
    </div>
  );
};

export default KanbanBoard;
