import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
  user_id: number | null;
  user_role: 0 | 1 | 2 | null;
  user_name: string | null;
  user_hakbun: string | null;
  user_hakgwa_cd: string | null;
  user_year: number | null;
}

interface UserStoreActions {
  setUser: (user: UserStore) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore & UserStoreActions>()(
  persist(
    (set) => ({
      user_id: null,
      user_role: null,
      user_name: null,
      user_hakbun: null,
      user_hakgwa_cd: null,
      user_year: null,
      setUser: (user) => set(user),
      clearUser: () =>
        set({
          user_id: null,
          user_role: null,
          user_name: null,
          user_hakbun: null,
          user_hakgwa_cd: null,
          user_year: null,
        }),
    }),
    {
      name: "user-storage", // localStorage key 이름
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
