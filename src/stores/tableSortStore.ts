import { create } from "zustand";

export type SortField =
  | "name"
  | "studentId"
  | "department"
  | "RQ"
  | "LQ"
  | "CQ"
  | "total";
export type SortOrder = "asc" | "desc";

interface TableSortState {
  sortField: SortField;
  sortOrder: SortOrder;
  setSortField: (field: SortField) => void;
  setSortOrder: (order: SortOrder) => void;
}

export const useTableSortStore = create<TableSortState>((set) => ({
  sortField: "total",
  sortOrder: "desc",
  setSortField: (field) =>
    set((state) => ({
      sortField: field,
      sortOrder:
        state.sortField === field && state.sortOrder === "desc"
          ? "asc"
          : "desc",
    })),
  setSortOrder: (order) => set({ sortOrder: order }),
}));
