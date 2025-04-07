import { create } from "zustand";

interface UserStore {
  user_id: number;
  user_role: 0 | 1 | 2;
  user_name: string;
  user_hakbun: string;
  user_hakgwa_cd: string;
  user_year: number;
}

const useUserStore = create<UserStore>((set) => ({
  user_id: 0,
  user_role: 0,
  user_name: "김민수",
  user_hakbun: "2020123456",
  user_hakgwa_cd: "CS201",
  user_year: 1.5,
}));

export default useUserStore;
