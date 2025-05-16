import { create } from "zustand";

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface FilterState {
  dateRange: DateRange;
  grade: string[];
  department: string[];
  status: string[];
  setDateRange: (range: DateRange) => void;
  setGrade: (grades: string[]) => void;
  setDepartment: (departments: string[]) => void;
  setStatus: (statuses: string[]) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  dateRange: {
    startDate: null,
    endDate: null,
  },
  grade: [],
  department: [],
  status: [],
  setDateRange: (range) => set({ dateRange: range }),
  setGrade: (grades) => set({ grade: grades }),
  setDepartment: (departments) => set({ department: departments }),
  setStatus: (statuses) => set({ status: statuses }),
  resetFilters: () =>
    set({
      dateRange: { startDate: null, endDate: null },
      grade: [],
      department: [],
      status: [],
    }),
}));
