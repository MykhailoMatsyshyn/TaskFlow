import { useCallback } from "react";

/**
 * Custom hook for handling drag and drop logic in Kanban Board.
 * @param {Array} columns - The list of columns in the board.
 * @param {Function} onColumnUpdate - Function to update columns order.
 * @param {Function} onTaskUpdate - Function to update task status when moved.
 * @returns {Function} handleDragEnd - Drag end handler for DragDropContext.
 */
export const useKanbanDragAndDrop = (columns, onColumnUpdate, onTaskUpdate) => {
  const handleDragEnd = useCallback(
    (result) => {
      const { source, destination, type } = result;

      if (!destination) return;

      if (type === "COLUMN") {
        // Reorder columns
        const updatedColumns = [...columns];
        const [movedColumn] = updatedColumns.splice(source.index, 1);
        updatedColumns.splice(destination.index, 0, movedColumn);
        onColumnUpdate(updatedColumns);
      } else if (type === "TASK") {
        const sourceColumn = columns.find(
          (col) => col.id === source.droppableId
        );
        const destinationColumn = columns.find(
          (col) => col.id === destination.droppableId
        );

        if (!sourceColumn || !destinationColumn) return;

        const sourceTasks = [...sourceColumn.tasks];
        const destinationTasks = [...destinationColumn.tasks];
        const [movedTask] = sourceTasks.splice(source.index, 1);

        if (sourceColumn.id === destinationColumn.id) {
          // Reorder tasks within the same column
          sourceTasks.splice(destination.index, 0, movedTask);
          const updatedColumns = columns.map((col) =>
            col.id === sourceColumn.id ? { ...col, tasks: sourceTasks } : col
          );
          onColumnUpdate(updatedColumns);
        } else {
          // Move task to a different column and update its status
          destinationTasks.splice(destination.index, 0, movedTask);
          const updatedColumns = columns.map((col) => {
            if (col.id === sourceColumn.id)
              return { ...col, tasks: sourceTasks };
            if (col.id === destinationColumn.id)
              return { ...col, tasks: destinationTasks };
            return col;
          });
          onColumnUpdate(updatedColumns);
          onTaskUpdate(movedTask, { status: destinationColumn.id });
        }
      }
    },
    [columns, onColumnUpdate, onTaskUpdate]
  );

  return { handleDragEnd };
};
