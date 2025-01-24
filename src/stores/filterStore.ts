import { create } from "zustand";
import { UserFilters } from "../types/filters";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

type FilterState = {
  filters: UserFilters;
  setFilter: (
    key: keyof UserFilters,
    value: string | number | undefined
  ) => void;
  setPagination: (pageIndex: number, pageSize: number) => void;
  resetFilters: () => void;
};

const initialFilters: UserFilters = {
  id: "",
  name: "",
  email: "",
  role: "",
  pageIndex: 1,
  pageSize: 10,
};

const useFilterStore = create<FilterState>()(
  immer(
    devtools((set) => ({
      filters: { ...initialFilters },

      // Метод для оновлення певного фільтра
      setFilter: (key, value) =>
        set((state) => {
          state.filters[key] = value;
          if (key !== "pageIndex") {
            // Якщо змінюється фільтр, а не сторінка, скидаємо пагінацію на 1
            state.filters.pageIndex = 1;
          }
        }),

      // Метод для оновлення пагінації
      setPagination: (pageIndex, pageSize) =>
        set((state) => {
          state.filters.pageIndex = pageIndex;
          state.filters.pageSize = pageSize;
        }),

      // Метод для скидання фільтрів до початкових значень
      resetFilters: () =>
        set((state) => {
          state.filters = { ...initialFilters };
        }),
    }))
  )
);

export default useFilterStore;
