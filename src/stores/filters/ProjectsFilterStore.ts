import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { ProjectFilters } from "../../types/filters";

/**
 * Type definition for the Project Filters Store state and actions.
 */
type ProjectFilterState = {
  filters: ProjectFilters;
  setFilter: (
    key: keyof ProjectFilters,
    value: string | number[] | undefined
  ) => void;
  resetFilters: () => void;
};

/**
 * Initial default values for project filters.
 */
const initialProjectFilters: ProjectFilters = {
  status: "",
  assignedMembers: [],
};

/**
 * Zustand store for managing project filter state.
 *
 * Features:
 * - Stores the current applied project filters.
 * - Allows updating specific filters.
 * - Resets filters to their default values.
 * - Uses Zustand's `immer` for immutable state updates.
 * - Uses Zustand's `devtools` middleware for debugging.
 */
const useProjectsFilterStore = create<ProjectFilterState>()(
  immer(
    devtools((set) => ({
      filters: { ...initialProjectFilters },

      setFilter: (key, value) =>
        set((state) => {
          if (key === "assignedMembers" && Array.isArray(value)) {
            state.filters.assignedMembers = value;
          } else if (key === "status" && typeof value === "string") {
            state.filters.status = value as ProjectFilters["status"];
          }
        }),

      resetFilters: () =>
        set((state) => {
          state.filters = { ...initialProjectFilters };
        }),
    }))
  )
);

export default useProjectsFilterStore;
