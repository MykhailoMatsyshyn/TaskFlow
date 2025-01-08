import { User } from "../types/user";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type UserStore = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  clearUser: () => void;
};

const useUserStore = create<UserStore>()(
  devtools((set) => ({
    currentUser: null,
    setCurrentUser: (user: User) => set({ currentUser: user }),
    clearUser: () => set({ currentUser: null }),
  }))
);

export default useUserStore;
