import { create } from "zustand";
import { UserFilters } from "../../types/filters";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

/**
 * Type definition for the Filter Store state and actions.
 */
type FilterState = {
  filters: UserFilters;
  setFilter: (key: keyof UserFilters, value: string | number) => void;
  setPagination: (pageIndex: number, pageSize: number) => void;
  resetFilters: () => void;
};

/**
 * Initial default values for filters.
 */
const initialFilters: UserFilters = {
  id: null,
  name: "",
  email: "",
  role: "",
  pageIndex: 1,
  pageSize: 10,
};

/**
 * Zustand store for managing user filter state.
 *
 * Features:
 * - Stores the current applied filters.
 * - Allows updating specific filters and pagination.
 * - Resets filters to their default values.
 * - Uses Zustand's `immer` for immutable state updates.
 * - Uses Zustand's `devtools` middleware for debugging.
 */
const useUsersFilterStore = create<FilterState>()(
  immer(
    devtools((set) => ({
      filters: { ...initialFilters },

      // Updates a specific filter and resets pagination if necessary.
      setFilter: <K extends keyof UserFilters>(key: K, value: UserFilters[K]) =>
        set((state) => {
          state.filters[key] = value;
          if (key !== "pageIndex") {
            // Reset pagination to first page when a filter is modified
            state.filters.pageIndex = 1;
          }
        }),

      // Updates pagination settings.
      setPagination: (pageIndex, pageSize) =>
        set((state) => {
          state.filters.pageIndex = pageIndex;
          state.filters.pageSize = pageSize;
        }),

      // Resets all filters to their initial values.
      resetFilters: () =>
        set((state) => {
          state.filters = { ...initialFilters };
        }),
    }))
  )
);

export default useUsersFilterStore;
