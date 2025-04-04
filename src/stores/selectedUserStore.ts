import { create } from "zustand";

export interface User {
  id: number;
  name: string;
  studentId: string;
  department: string;
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
  selectedUsers: number[];
  setSelectedUsers: (users: number[]) => void;
  toggleUser: (userId: number) => void;
  clearSelectedUsers: () => void;
}

export const useSelectedUserStore = create<SelectedUserStore>((set) => ({
  selectedUsers: [],
  setSelectedUsers: (users) => set({ selectedUsers: users }),
  toggleUser: (userId) =>
    set((state) => ({
      selectedUsers: state.selectedUsers.includes(userId)
        ? state.selectedUsers.filter((id) => id !== userId)
        : [...state.selectedUsers, userId],
    })),
  clearSelectedUsers: () => set({ selectedUsers: [] }),
}));
