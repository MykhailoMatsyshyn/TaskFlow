import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Column from "./components/Column/Column";
import AddColumnButton from "./components/Buttons/AddColumnButton";
import { useKanbanDragAndDrop } from "../../hooks/useKanbanDragAndDrop";

/**
 * KanbanBoard Component
 * 
 * This component renders the main Kanban board layout, allowing users to manage columns and tasks
 * with drag-and-drop functionality.
 * 
 * Features:
 * - Supports column reordering via drag and drop.
 * - Allows tasks to be moved between columns.
 * - Provides an interface for adding new columns.
 *
 * @param {Object} props
 * @param {string} props.projectId - The ID of the current project.
 * @param {Array} props.columns - List of columns in the Kanban board.
 * @param {Array} props.tasks - List of tasks associated with the project.
 * @param {Function} props.onColumnUpdate - Function to update column order.
 * @param {Function} props.onTaskUpdate - Function to update task position/status.
 */
const KanbanBoard = ({
  projectId,
  columns,
  tasks,
  onColumnUpdate,
  onTaskUpdate,
}) => {
  // Custom hook to handle drag-and-drop logic
  const { handleDragEnd } = useKanbanDragAndDrop(
    columns,
    onColumnUpdate,
    onTaskUpdate
  );

  /**
   * Renders the list of columns as draggable elements.
   *
   * @param {Object} provided - Droppable props from react-dnd.
   * @returns {JSX.Element} Rendered list of draggable columns.
   */
  const renderColumns = (provided) => (
    <ul {...provided.droppableProps} ref={provided.innerRef} className="flex">
      {columns.map((column, index) => (
        <Draggable key={column.id} draggableId={column.id} index={index}>
          {(provided) => (
            <li
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="w-[368px]"
            >
              <Column
                projectId={projectId}
                column={column}
                tasks={column.tasks
                  .map((taskId) => tasks.find((task) => task.id === taskId))
                  .filter(Boolean)}
              />
            </li>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </ul>
  );

  return (
    <div className="flex overflow-x-auto overflow-y-hidden w-full h-[calc(100vh-164px)] custom-scrollbar">
      {/* Drag-and-drop context to enable reordering */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided) => renderColumns(provided)}
        </Droppable>
      </DragDropContext>

      {/* Button to add new columns */}
      <AddColumnButton projectId={projectId} columns={columns} />
    </div>
  );
};

export default KanbanBoard;
