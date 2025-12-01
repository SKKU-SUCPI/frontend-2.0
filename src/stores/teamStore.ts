import { create } from "zustand";
import type { SelectedUser } from "./selectedUserStore";

export interface Team {
  id: number;
  name: string;
  members: SelectedUser[];
}

interface TeamStore {
  teams: Team[];
  addTeam: (team: Team) => void;
  removeTeam: (teamId: number) => void;
  clearTeams: () => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  teams: [],

  addTeam: (team: Team) =>
    set((state) => ({
      teams: [...state.teams, team],
    })),

  removeTeam: (teamId: number) =>
    set((state) => ({
      teams: state.teams.filter((team) => team.id !== teamId),
    })),

  clearTeams: () => set({ teams: [] }),
}));


