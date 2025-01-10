import { create } from "zustand";
import { UserFilters } from "../types/filters";
import { immer } from "zustand/middleware/immer";

type FilterState = {
  filters: UserFilters;
  setFilter: (key: string, value: string | number | undefined) => void;
  setPagination: (pageIndex: number, pageSize: number) => void;
};

const useFilterStore = create<FilterState>()(
  immer((set) => ({
    filters: {
      id: "",
      name: "",
      email: "",
      role: "",
      pageIndex: 1,
      pageSize: 10,
    },
    setFilter: (key, value) =>
      set((state) => {
        state.filters[key] = value;
      }),
    setPagination: (pageIndex, pageSize) =>
      set((state) => {
        state.filters.pageIndex = pageIndex;
        state.filters.pageSize = pageSize;
      }),
  }))
);

export default useFilterStore;
