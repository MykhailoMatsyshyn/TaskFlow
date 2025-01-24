import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { TaskFilters } from "../types/filters";

type TaskFilterState = {
  filters: TaskFilters;
  setFilter: (
    key: keyof TaskFilters,
    value: string | number[] | undefined
  ) => void;
  resetFilters: () => void;
};

const initialTaskFilters: TaskFilters = {
  status: "",
  priority: "Without priority", // Default priority
  assignedMember: [], // Empty array for members
  startDate: "",
  endDate: "",
};

const useTaskFilterStore = create<TaskFilterState>()(
  immer(
    devtools((set) => ({
      filters: { ...initialTaskFilters },

      // Method to update a specific filter
      setFilter: (key, value) =>
        set((state) => {
          if (key === "assignedMember" && Array.isArray(value)) {
            state.filters.assignedMember = value; // Update array for members
          } else if (key !== "assignedMember") {
            state.filters[key] = value || ""; // Set empty string if value is undefined
          }
        }),

      // Method to reset all filters to their initial state
      resetFilters: () =>
        set((state) => {
          state.filters = { ...initialTaskFilters };
        }),
    }))
  )
);

export default useTaskFilterStore;
