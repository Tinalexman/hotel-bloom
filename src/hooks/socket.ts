import { useToken } from "../providers/AuthProvider";
import { BASE } from "../services/base";
import { useDashboardData } from "../stores/dashboardStore";
import { iStaff } from "../stores/userStore";
import { useGetCurrentUser, useLogout } from "./authHooks";

export async function connectToSocket() {
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
}

const handleEvents = (data: string) => {
  const payload: { notification: string } = JSON.parse(data);
  const message: string = payload.notification;
  console.log("Socket Message", message);
  if (message === "Get User") {
    const { get: getUser } = useGetCurrentUser();
    handleGetUser(getUser);
  } else if (message === "Get Sections" || message === "Get Inventories") {
    useDashboardData.getState().refresh();
  } else if (message === "Log Out") {
    const { logout } = useLogout();
    handleLogout(logout);
  } else {
    useDashboardData.getState().socketCallback();
  }
};

const handleLogout = async (logout: () => Promise<boolean | undefined>) => {
  const result = await logout();
  if (result) {
    window.location.replace("/auth/login");
  }
};

const handleGetUser = async (getUser: () => Promise<iStaff | undefined>) => {
  const result = await getUser();
  if (result) {
  }
};
