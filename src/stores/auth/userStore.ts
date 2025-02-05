import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "../../types/user";

/**
 * Type definition for the User Store state and actions.
 */
type UserStore = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  clearUser: () => void;
};

/**
 * Zustand store for managing user authentication state.
 *
 * Features:
 * - Stores the current authenticated user.
 * - Provides functions to set or clear the user.
 * - Uses Zustand's devtools middleware for debugging.
 */
const useUserStore = create<UserStore>()(
  devtools((set) => ({
    currentUser: null,
    setCurrentUser: (user: User) => set({ currentUser: user }),
    clearUser: () => set({ currentUser: null }),
  }))
);

export default useUserStore;
