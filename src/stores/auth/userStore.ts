import { create } from "zustand";

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

const useUserStore = create<UserStore & UserStoreActions>((set) => ({
  user_id: null,
  user_role: null,
  user_name: null,
  user_hakbun: null,
  user_hakgwa_cd: null,
  user_year: null,
  setUser: (user: UserStore) => set(user),
  clearUser: () =>
    set({
      user_id: null,
      user_role: null,
      user_name: null,
      user_hakbun: null,
      user_hakgwa_cd: null,
      user_year: null,
    }),
}));

export default useUserStore;
