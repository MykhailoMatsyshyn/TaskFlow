import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { TaskFilters } from "../../types/filters";

/**
 * Type definition for the Task Filters Store state and actions.
 */
type TaskFilterState = {
  filters: TaskFilters;
  setFilter: (
    key: keyof TaskFilters,
    value: string | number[] | undefined
  ) => void;
  resetFilters: () => void;
};

/**
 * Initial default values for task filters.
 */
const initialTaskFilters: TaskFilters = {
  status: "",
  priority: "all",
  assignedMembers: [],
};

/**
 * Zustand store for managing task filter state.
 *
 * Features:
 * - Stores the current applied task filters.
 * - Allows updating specific filters.
 * - Resets filters to their default values.
 * - Uses Zustand's `immer` for immutable state updates.
 * - Uses Zustand's `devtools` middleware for debugging.
 */
const useTasksFilterStore = create<TaskFilterState>()(
  immer(
    devtools((set) => ({
      filters: { ...initialTaskFilters },

      setFilter: (key, value) =>
        set((state) => {
          if (key === "assignedMembers" && Array.isArray(value)) {
            state.filters.assignedMembers = value;
          } else if (key !== "assignedMembers" && typeof value === "string") {
            state.filters[key] = value as TaskFilters["priority"];
          }
        }),

      resetFilters: () =>
        set((state) => {
          state.filters = { ...initialTaskFilters };
        }),
    }))
  )
);

export default useTasksFilterStore;
