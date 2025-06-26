import { create } from "zustand";

interface User {
  id: number;
  name: string;
  department: string;
  studentId: string;
  lq: number;
  rq: number;
  cq: number;
  totalScore: number;
}

interface Averages {
  averageLQ: number;
  averageRQ: number;
  averageCQ: number;
  averageTotal: number;
}

interface SelectedUserStore {
  selectedUsers: User[];
  averages: Averages;
  addUser: (user: User) => void;
  removeUser: (userId: number) => void;
  setUsers: (users: User[]) => void;
  clearUsers: () => void;
  isUserSelected: (userId: number) => boolean;
  calculateAverages: () => void;
}

const calculateAverages = (users: User[]): Averages => {
  if (users.length === 0) {
    return {
      averageLQ: 0,
      averageRQ: 0,
      averageCQ: 0,
      averageTotal: 0,
    };
  }

  const sumLQ = users.reduce((acc, user) => acc + user.lq, 0);
  const sumRQ = users.reduce((acc, user) => acc + user.rq, 0);
  const sumCQ = users.reduce((acc, user) => acc + user.cq, 0);
  const sumTotal = users.reduce((acc, user) => acc + user.totalScore, 0);

  return {
    averageLQ: Math.round((sumLQ / users.length) * 100) / 100,
    averageRQ: Math.round((sumRQ / users.length) * 100) / 100,
    averageCQ: Math.round((sumCQ / users.length) * 100) / 100,
    averageTotal: Math.round((sumTotal / users.length) * 100) / 100,
  };
};

export const useSelectedUserStore = create<SelectedUserStore>((set, get) => ({
  selectedUsers: [],
  averages: {
    averageLQ: 0,
    averageRQ: 0,
    averageCQ: 0,
    averageTotal: 0,
  },

  addUser: (user: User) => {
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

  setUsers: (users: User[]) => {
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
