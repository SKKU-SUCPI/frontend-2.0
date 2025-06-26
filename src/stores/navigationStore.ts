import { create } from "zustand";

interface NavigationState {
  selectedTab: "statistic" | "activity";
  toggleTab: () => void;
  setSelectedTab: (tab: "statistic" | "activity") => void;
}

const useNavigationStore = create<NavigationState>((set) => ({
  selectedTab: "statistic",
  toggleTab: () =>
    set((state) => ({
      selectedTab: state.selectedTab === "statistic" ? "activity" : "statistic",
    })),
  setSelectedTab: (tab) => set({ selectedTab: tab }),
}));

export default useNavigationStore;
