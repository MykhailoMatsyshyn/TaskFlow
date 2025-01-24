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
  assignedMember: [],
  startDate: "",
  endDate: "",
};

const useTaskFilterStore = create<TaskFilterState>()(
  immer(
    devtools((set) => ({
      filters: { ...initialTaskFilters },

      setFilter: (key, value) =>
        set((state) => {
          if (key === "assignedMember" && Array.isArray(value)) {
            state.filters.assignedMember = value;
          } else if (key !== "assignedMember") {
            state.filters[key] = value || "";
          }
        }),

      resetFilters: () =>
        set((state) => {
          state.filters = { ...initialTaskFilters };
          console.log(state.filters);
        }),
    }))
  )
);

export default useTaskFilterStore;
