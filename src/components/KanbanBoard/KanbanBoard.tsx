import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useUpdateColumns } from "../../hooks/useUpdateColumns";
import { useProjectDataBySlug } from "../../hooks/useProjectDataBySlug";
import Column from "./Column";
import AddColumnButton from "./AddColumnButton";
import { useTasksByProject } from "../../hooks/useTasksByProject";

const KanbanBoard = ({ projectId }: { projectId: string }) => {
  const { data: project, isLoading } = useProjectDataBySlug(projectId);

  const { data: tasks, isLoading: tasksLoading } = useTasksByProject(
    project?.id
  );

  console.log("project:", project);

  const { mutate: updateColumns } = useUpdateColumns(project?.id);

  const handleDragEnd = (result: any) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === "COLUMN") {
      // Логіка для перетягування колонок
      const updatedColumns = [...project.columns];
      const [movedColumn] = updatedColumns.splice(source.index, 1);
      updatedColumns.splice(destination.index, 0, movedColumn);

      updateColumns(updatedColumns);
    } else {
      // Логіка для перетягування задач
      const sourceColumn = project.columns.find(
        (col) => col.id === source.droppableId
      );

      const destinationColumn = project.columns.find(
        (col) => col.id === destination.droppableId
      );

      const sourceTasks = [...sourceColumn.tasks];
      const destinationTasks = [...destinationColumn.tasks];

      const [movedTask] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, movedTask);

      updateColumns(
        project.columns.map((col) => {
          if (col.id === sourceColumn.id) col.tasks = sourceTasks;
          if (col.id === destinationColumn.id) col.tasks = destinationTasks;
          return col;
        })
      );
    }
  };

  if (isLoading || tasksLoading) return <div>Loading...</div>;

  return (
    <div className="flex gap-5  overflow-x-auto overflow-y-hidden bg-gray-100 w-full h-full">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex gap-4"
            >
              {project.columns.map((column, index) => (
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
                    >
                      <Column
                        column={column}
                        tasks={tasks.filter(
                          (task) => task.status === column.id
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
      <AddColumnButton projectId={project?.id} />
    </div>
  );
};

export default KanbanBoard;
