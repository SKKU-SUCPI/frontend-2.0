import { create } from "zustand";
interface UserProfile {
  id: number | null;
  name: string | null;
  department: string | null;
  studentId: string | null;
  role: "student" | "admin" | "super-admin" | null;
}

type AuthState = {
  accessToken: string | null;

  userProfile: UserProfile | null;

  setAccessToken: (token: string) => void;

  setUserProfile: (userProfile: UserProfile) => void;

  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  userProfile: null,
  setAccessToken: (token: string) =>
    set(() => ({
      accessToken: token,
    })),

  setUserProfile: (userProfile: UserProfile) =>
    set(() => ({
      userProfile: userProfile,
    })),

  clearAuth: () =>
    set(() => ({
      accessToken: null,
      userProfile: null,
    })),
}));

export default useAuthStore;
