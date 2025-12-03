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
  updateTeam: (team: Team) => void;
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

  updateTeam: (team: Team) =>
    set((state) => ({
      teams: state.teams.map((t) => (t.id === team.id ? team : t)),
    })),

  clearTeams: () => set({ teams: [] }),
}));


