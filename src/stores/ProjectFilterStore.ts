import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { ProjectFilters } from "../types/filters";

type ProjectFilterState = {
  filters: ProjectFilters;
  setFilter: (
    key: keyof ProjectFilters,
    value: string | number[] | undefined
  ) => void;
  resetFilters: () => void;
};

const initialProjectFilters: ProjectFilters = {
  status: "",
  assignedMembers: [],
};

const useProjectFilterStore = create<ProjectFilterState>()(
  immer(
    devtools((set) => ({
      filters: { ...initialProjectFilters },

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
          state.filters = { ...initialProjectFilters };
        }),
    }))
  )
);

export default useProjectFilterStore;
