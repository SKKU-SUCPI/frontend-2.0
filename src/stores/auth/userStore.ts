import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
  id: number | null;
  name: string | null;
  department: string | null;
  studentId: string | null;
  role: "student" | "admin" | "super-admin" | null;
}

interface UserStoreActions {
  setUser: (user: UserStore) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore & UserStoreActions>()(
  persist(
    (set) => ({
      id: null,
      name: null,
      department: null,
      studentId: null,
      role: null,
      setUser: (user) => set(user),
      clearUser: () =>
        set({
          id: null,
          name: null,
          department: null,
          studentId: null,
          role: null,
        }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
