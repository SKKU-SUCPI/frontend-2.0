import { create } from "zustand";

interface NavigationState {
  selectedTab: "statistics" | "activities";
  toggleTab: () => void;
}

const useNavigationStore = create<NavigationState>((set) => ({
  selectedTab: "statistics",
  toggleTab: () =>
    set((state) => ({
      selectedTab:
        state.selectedTab === "statistics" ? "activities" : "statistics",
    })),
}));

export default useNavigationStore;
