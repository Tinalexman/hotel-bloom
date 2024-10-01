import { create } from "zustand";

export type tDashboardNavigationData = {
  expanded: boolean;
  searchFilter: string;
  shouldRefresh: boolean;
  refresh: () => void;

  connectedToSocket: boolean;
  webSocket: WebSocket | null;
  socketCallback: () => void;
};

export const useDashboardData = create<tDashboardNavigationData>(
  (set, get) => ({
    expanded: true,
    searchFilter: "",
    shouldRefresh: false,
    refresh: () => {
      set({ shouldRefresh: !get().shouldRefresh });
    },
    webSocket: null,
    connectedToSocket: false,
    socketCallback: () => {},
  })
);
