import { create } from "zustand";

export type tDashboardNavigationData = {
  page: number;
  searchFilter: string;
  refreshPage: boolean;
  refresh: () => void;
  setPage: (p: number) => void;
};

export const useDashboardData = create<tDashboardNavigationData>((set) => ({
  page: 0,
  searchFilter: "",
  refreshPage: false,
  refresh: () => {
    set({ refreshPage: !useDashboardData.getState().refreshPage });
  },
  setPage: (p: number) => {
    set({ page: p });
  },
}));
