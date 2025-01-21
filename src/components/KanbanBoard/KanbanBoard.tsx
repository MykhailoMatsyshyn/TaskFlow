import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useUpdateColumns } from "../../hooks/useUpdateColumns";
import { useProjectDataBySlug } from "../../hooks/useProjectDataBySlug";
import Column from "./Column";
import AddColumnButton from "./AddColumnButton";
import { useTasksByProject } from "../../hooks/useTasksByProject";
import { useEffect, useState } from "react";
import { useUpdateTask } from "../../hooks/useUpdateTask";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const KanbanBoard = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: project, error, isLoading } = useProjectDataBySlug(slug);

  useEffect(() => {
    if (error) {
      toast.error("Error: Project not found. Please check the URL.");
      navigate("/dashboard");
    }
  }, [error, navigate]);

  const [columns, setColumns] = useState(project?.columns || []);
  const { data: tasks, isLoading: tasksLoading } = useTasksByProject(
    project?.id
  );

  console.log(columns);

  const { mutate: updateColumns } = useUpdateColumns(project?.id);
  const { mutate: updateTask } = useUpdateTask();

  // Синхронізація стану колонок із серверними даними
  useEffect(() => {
    if (project?.columns) {
      setColumns(project.columns);
    }
  }, [project?.columns]);

  const handleDragEnd = (result: any) => {
    const { source, destination, type } = result;

    if (!destination) return; // Якщо колонку скинули не на допустиму область

    if (type === "COLUMN") {
      // Копіюємо колонки
      const updatedColumns = Array.from(project.columns);

      // Видаляємо колонку з початкової позиції
      const [movedColumn] = updatedColumns.splice(source.index, 1);

      // Додаємо колонку в нову позицію
      updatedColumns.splice(destination.index, 0, movedColumn);

      console.log("updatedColumns", updatedColumns);

      // Зберігаємо попередній стан для відкату
      const previousColumns = [...columns];

      // Оновлюємо локальний стан
      setColumns(updatedColumns);

      // Відправляємо зміни на сервер
      updateColumns(updatedColumns, {
        onError: () => {
          // У разі помилки відновлюємо попередній стан
          setColumns(previousColumns);
          alert("Failed to update columns. Please try again.");
        },
      });
    } else if (type === "TASK") {
      // Логіка для переміщення задач
      const sourceColumn = columns.find((col) => col.id === source.droppableId);
      const destinationColumn = columns.find(
        (col) => col.id === destination.droppableId
      );

      if (!sourceColumn || !destinationColumn) return;

      // Копії масивів задач
      const sourceTasks = [...sourceColumn.tasks];
      const destinationTasks = [...destinationColumn.tasks];

      // Виймаємо задачу із джерела
      const [movedTask] = sourceTasks.splice(source.index, 1);

      if (sourceColumn.id === destinationColumn.id) {
        // Якщо переміщення в межах однієї колонки
        sourceTasks.splice(destination.index, 0, movedTask);

        const updatedColumns = columns.map((col) => {
          if (col.id === sourceColumn.id) {
            return { ...col, tasks: sourceTasks };
          }
          return col;
        });

        setColumns(updatedColumns);

        // Оновлюємо бекенд
        updateColumns(updatedColumns, {
          onError: () => {
            alert("Failed to update tasks. Please try again.");
          },
        });
      } else {
        // Якщо переміщення між колонками
        destinationTasks.splice(destination.index, 0, movedTask);

        const updatedColumns = columns.map((col) => {
          if (col.id === sourceColumn.id) {
            return { ...col, tasks: sourceTasks };
          }
          if (col.id === destinationColumn.id) {
            return { ...col, tasks: destinationTasks };
          }
          return col;
        });

        setColumns(updatedColumns);

        // Оновлюємо бекенд
        updateTask({
          id: movedTask,
          data: { status: destinationColumn.id },
        });

        updateColumns(updatedColumns, {
          onError: () => {
            alert("Failed to update tasks. Please try again.");
          },
        });
      }
    }
  };

  if (isLoading || tasksLoading) return <div>Loading...</div>;

  return (
    <div className="flex overflow-x-auto overflow-y-hidden w-full h-[calc(100vh-108px)] custom-scrollbar">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex"
            >
              {Array.isArray(columns) &&
                columns.map((column, index) => (
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
                          projectId={project?.id}
                          column={column}
                          tasks={
                            Array.isArray(column.tasks)
                              ? column.tasks
                                  .map((taskId) =>
                                    tasks.find((task) => task.id === taskId)
                                  )
                                  .filter(Boolean)
                              : []
                          }
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
      <AddColumnButton projectId={project?.id} columns={columns} />
    </div>
  );
};

export default KanbanBoard;
