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
  priority: "all",
  assignedMembers: [],
  startDate: "",
  endDate: "",
};

const useTaskFilterStore = create<TaskFilterState>()(
  immer(
    devtools((set) => ({
      filters: { ...initialTaskFilters },

      setFilter: (key, value) =>
        set((state) => {
          if (key === "assignedMembers" && Array.isArray(value)) {
            state.filters.assignedMembers = value;
          } else if (key !== "assignedMembers") {
            state.filters[key] = value || "";
          }
        }),

      resetFilters: () =>
        set((state) => {
          state.filters = { ...initialTaskFilters };
        }),
    }))
  )
);

export default useTaskFilterStore;
