import { create } from "zustand";

interface NavigationState {
  selectedTab: "statistic" | "activity";
  toggleTab: () => void;
}

const useNavigationStore = create<NavigationState>((set) => ({
  selectedTab: "statistic",
  toggleTab: () =>
    set((state) => ({
      selectedTab: state.selectedTab === "statistic" ? "activity" : "statistic",
    })),
}));

export default useNavigationStore;
