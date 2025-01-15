import { create } from "zustand";

const useKanbanStore = create((set) => ({
  // Стан колонок
  defaultColumns: [
    { id: "to-do", title: "To Do", tasks: [] },
    { id: "in-progress", title: "In Progress", tasks: [] },
    { id: "done", title: "Done", tasks: [] },
  ],
  customColumns: [],

  // Додати нову колонку
  addColumn: (title) =>
    set((state) => ({
      customColumns: [
        ...state.customColumns,
        { id: Date.now().toString(), title, tasks: [] },
      ],
    })),

  // Видалити колонку
  deleteColumn: (columnId) =>
    set((state) => ({
      customColumns: state.customColumns.filter((col) => col.id !== columnId),
    })),

  // Оновити завдання в колонці
  updateColumnTasks: (columnId, tasks) =>
    set((state) => {
      const allColumns = [...state.defaultColumns, ...state.customColumns];
      const updatedColumns = allColumns.map((col) =>
        col.id === columnId ? { ...col, tasks } : col
      );
      return {
        defaultColumns: updatedColumns.filter((col) =>
          state.defaultColumns.some((defCol) => defCol.id === col.id)
        ),
        customColumns: updatedColumns.filter(
          (col) => !state.defaultColumns.some((defCol) => defCol.id === col.id)
        ),
      };
    }),
}));
export default useKanbanStore;
