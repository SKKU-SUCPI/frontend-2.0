import { create } from "zustand";

export interface User {
  id: number;
  name: string;
  studentId: string;
  department: "소프트웨어" | "지능형소프트" | "글로벌융합";
  grade: number;
  lq: number;
  rq: number;
  cq: number;
  totalScore: number;
  tlq: number;
  tcq: number;
  trq: number;
}

interface SelectedUserStore {
  selectedUsers: User[];
  setSelectedUsers: (users: User[]) => void;
  toggleUser: (user: User) => void;
  clearSelectedUsers: () => void;
}

export const useSelectedUserStore = create<SelectedUserStore>((set) => ({
  selectedUsers: [],
  setSelectedUsers: (users) => set({ selectedUsers: users }),
  toggleUser: (user) =>
    set((state) => ({
      selectedUsers: state.selectedUsers.some(
        (selectedUser) => selectedUser.id === user.id
      )
        ? state.selectedUsers.filter((u) => u.id !== user.id)
        : [...state.selectedUsers, user],
    })),
  clearSelectedUsers: () => set({ selectedUsers: [] }),
}));
