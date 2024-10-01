import { useEffect } from "react";
import { useToken } from "../providers/AuthProvider";
import { BASE, useAxios } from "../services/base";
import { useDashboardData } from "../stores/dashboardStore";
import {
  clearStaffData,
  iStaff,
  useCurrentStaffStore,
} from "../stores/userStore";

export const useSocket = () => {
  const { removeToken } = useToken();
  const { requestApi } = useAxios();

  const refresh = useDashboardData((state) => state.refresh);

  const init = () => {
    let ws = useDashboardData.getState().webSocket;
    const token = useToken().getToken();

    if (token === undefined) {
      return;
    }

    if (ws !== null) {
      ws.close();
    }

    ws = new WebSocket(`${BASE}/ws/notification?token=${token}`);

    ws.onopen = (ev: Event) => {
      useDashboardData.setState({
        connectedToSocket: true,
        webSocket: ws,
      });
    };
    ws.onclose = (ev: Event) => {
      useDashboardData.setState({
        connectedToSocket: false,
        webSocket: null,
      });
    };
    ws.onerror = (ev: Event) => {
      useDashboardData.setState({
        connectedToSocket: false,
        webSocket: null,
      });
    };

    ws.onmessage = (ev: MessageEvent) => {
      handleEvents(ev.data);
    };
  };

  const handleEvents = (data: string) => {
    const payload: { notification: string } = JSON.parse(data);
    const message: string = payload.notification;
    console.log("Socket Message", message);
    if (message === "Get User") {
      handleGetUser();
    } else if (message === "Get Sections" || message === "Get Inventories") {
      refresh();
    } else if (message === "Log Out") {
      handleLogout();
    } else {
      useDashboardData.getState().socketCallback();
    }
  };

  const handleLogout = async () => {
    const { status } = await requestApi("/log-out", "PUT");
    if (status) {
      window.location.replace("/auth/login");
      removeToken();
      clearStaffData();
    }
  };

  const handleGetUser = async () => {
    const { status, data } = await requestApi("/", "GET");
    if (status) {
      useCurrentStaffStore.setState({ ...data });
    }
  };

  return { init };
};
