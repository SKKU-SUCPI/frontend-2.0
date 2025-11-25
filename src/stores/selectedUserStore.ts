import { create } from "zustand";

export interface SelectedUser {
  id: number;
  name: string;
  department: string;
  studentId: string;
  lq: number;
  rq: number;
  cq: number;
  totalScore: number;
  tlq?: number;
  trq?: number;
  tcq?: number;
  totalTScore?: number;
}

interface Averages {
  averageLQ: number;
  averageRQ: number;
  averageCQ: number;
  averageTotal: number;
  averageTLQ: number;
  averageTRQ: number;
  averageTCQ: number;
  averageTTotal: number;
}

interface SelectedUserStore {
  selectedUsers: SelectedUser[];
  averages: Averages;
  addUser: (user: SelectedUser) => void;
  removeUser: (userId: number) => void;
  setUsers: (users: SelectedUser[]) => void;
  clearUsers: () => void;
  isUserSelected: (userId: number) => boolean;
  calculateAverages: () => void;
}

const calculateAverages = (users: SelectedUser[]): Averages => {
  if (users.length === 0) {
    return {
      averageLQ: 0,
      averageRQ: 0,
      averageCQ: 0,
      averageTotal: 0,
      averageTLQ: 0,
      averageTRQ: 0,
      averageTCQ: 0,
      averageTTotal: 0,
    };
  }

  const sumLQ = users.reduce((acc, user) => acc + user.lq, 0);
  const sumRQ = users.reduce((acc, user) => acc + user.rq, 0);
  const sumCQ = users.reduce((acc, user) => acc + user.cq, 0);
  const sumTotal = users.reduce((acc, user) => acc + user.totalScore, 0);

  const sumTLQ = users.reduce((acc, user) => acc + (user.tlq || 0), 0);
  const sumTRQ = users.reduce((acc, user) => acc + (user.trq || 0), 0);
  const sumTCQ = users.reduce((acc, user) => acc + (user.tcq || 0), 0);
  const sumTTotal = users.reduce((acc, user) => acc + (user.totalTScore || 0), 0);

  return {
    averageLQ: Math.round((sumLQ / users.length) * 100) / 100,
    averageRQ: Math.round((sumRQ / users.length) * 100) / 100,
    averageCQ: Math.round((sumCQ / users.length) * 100) / 100,
    averageTotal: Math.round((sumTotal / users.length) * 100) / 100,
    averageTLQ: Math.round((sumTLQ / users.length) * 100) / 100,
    averageTRQ: Math.round((sumTRQ / users.length) * 100) / 100,
    averageTCQ: Math.round((sumTCQ / users.length) * 100) / 100,
    averageTTotal: Math.round((sumTTotal / users.length) * 100) / 100,
  };
};

export const useSelectedUserStore = create<SelectedUserStore>((set, get) => ({
  selectedUsers: [],
  averages: {
    averageLQ: 0,
    averageRQ: 0,
    averageCQ: 0,
    averageTotal: 0,
    averageTLQ: 0,
    averageTRQ: 0,
    averageTCQ: 0,
    averageTTotal: 0,
  },

  addUser: (user: SelectedUser) => {
    const { selectedUsers } = get();
    if (!selectedUsers.find((u) => u.id === user.id)) {
      const newUsers = [...selectedUsers, user];
      const newAverages = calculateAverages(newUsers);
      set({ selectedUsers: newUsers, averages: newAverages });
    }
  },

  removeUser: (userId: number) => {
    const { selectedUsers } = get();
    const newUsers = selectedUsers.filter((user) => user.id !== userId);
    const newAverages = calculateAverages(newUsers);
    set({ selectedUsers: newUsers, averages: newAverages });
  },

  setUsers: (users: SelectedUser[]) => {
    const newAverages = calculateAverages(users);
    set({ selectedUsers: users, averages: newAverages });
  },

  clearUsers: () => {
    set({
      selectedUsers: [],
      averages: {
        averageLQ: 0,
        averageRQ: 0,
        averageCQ: 0,
        averageTotal: 0,
        averageTLQ: 0,
        averageTRQ: 0,
        averageTCQ: 0,
        averageTTotal: 0,
      },
    });
  },

  isUserSelected: (userId: number) => {
    const { selectedUsers } = get();
    return selectedUsers.some((user) => user.id === userId);
  },

  calculateAverages: () => {
    const { selectedUsers } = get();
    const newAverages = calculateAverages(selectedUsers);
    set({ averages: newAverages });
  },
}));
