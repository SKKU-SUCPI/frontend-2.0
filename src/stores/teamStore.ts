import { create } from "zustand";
import type { SelectedUser } from "./selectedUserStore";
import getProjectTeams from "@/apis/team/getProjectTeams";
import { getTeamRoster } from "@/apis/team/getTeamRoster";

export interface TeamMember extends Partial<SelectedUser> {
  id: number;
  name: string;
  memberRole: "LEADER" | "MEMBER";
  joinStatus: number;
}

export interface Team {
  id: number;
  name: string;
  projectId: number;
  members: TeamMember[];
}

interface TeamStore {
  teams: Team[];
  isLoading: boolean;
  addTeam: (team: Team) => void;
  removeTeam: (teamId: number) => void;
  updateTeam: (team: Team) => void;
  clearTeams: () => void;
  fetchProjectTeams: (projectId: number) => Promise<void>;
}

export const useTeamStore = create<TeamStore>((set) => ({
  teams: [],
  isLoading: false,

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

  fetchProjectTeams: async (projectId: number) => {
    set({ isLoading: true });
    try {
      const dbTeams = await getProjectTeams(projectId);

      const fullyPopulatedTeams = await Promise.all(
        dbTeams.map(async (t) => {
          const roster = await getTeamRoster(t.teamId);
          return {
            id: t.teamId,
            name: t.teamName,
            projectId: t.projectId,
            members: roster.map((m: any) => ({
              id: m.id,
              name: m.name,
              department: m.department,
              studentId: m.studentId,
              lq: m.lq,
              rq: m.rq,
              cq: m.cq,
              totalScore: m.totalScore,
              tlq: m.tlq,
              trq: m.trq,
              tcq: m.tcq,
              memberRole: m.memberRole,
              joinStatus: m.joinStatus,
            })),
          };
        })
      );

      set({ teams: fullyPopulatedTeams, isLoading: false });
    } catch (error) {
      console.error("팀 정보를 못 불러왔습니다.", error);
      set({ isLoading: false });
    }
  },
}));


