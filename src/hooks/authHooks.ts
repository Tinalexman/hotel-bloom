import { useState } from "react";
import { useAxios } from "../services/base";
import toast from "react-hot-toast";
import {
  clearStaffData,
  iStaff,
  useCurrentStaffStore,
} from "../stores/userStore";
import { useToken } from "../providers/AuthProvider";

export interface iManualRegisterPayload {
  name: string;
  email: string;
  password: string;
  shift_hours: string;
  username: string;
}

export interface iRegisterResponse {
  id: string;
  email: string;
  name: string;
  shift_hours: number;
  verified_email: boolean;
}

export interface iVerifyEmailPayload {
  email: string;
  token: string;
}

export const useLogout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const { removeToken } = useToken();

  let logout = async () => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi("/log-out", "PUT");
    setLoading(false);
    setSuccess(status);

    if (!status) {
      toast.error("Something went wrong. Please try again");
    } else {
      clearStaffData();
      removeToken();
    }

    return status;
  };

  return {
    loading,
    success,
    logout,
  };
};

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iStaff>({
    id: "",
    username: "",
    organization: "",
    organization_name: "",
    permissions: {
      view_log: false,
      create_section: false,
      manage_inventory: false,
      manage_staff: false,
      managed_sections: [],
    },
  });
  const { requestApi } = useAxios();
  const { setToken } = useToken();

  let login = async (payload: { username: string; password: string }) => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi("/auth", "POST", payload);
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Welcome back to Servexi");
      const staff = data as iStaff;
      setData(staff);
      setToken(data.token);
      useCurrentStaffStore.setState({ ...staff });
    } else {
      toast.error(getLoginError(data));
    }
  };

  return {
    loading,
    success,
    login,
    data,
  };
};

export const useRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const { requestApi } = useAxios();

  let register = async (payload: iManualRegisterPayload) => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi("/org", "POST", payload);
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Welcome to Servexi");
      setData(data);
    } else {
      toast.error(getRegistrationError(data));
    }
  };

  return {
    loading,
    success,
    register,
    data,
  };
};

export const useGetCurrentUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let get = async () => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi("/org", "GET");
    setLoading(false);
    setSuccess(status);

    return data;
  };

  return {
    loading,
    success,
    get,
  };
};

export const useVerify = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let verify = async (payload: iVerifyEmailPayload) => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi("/org/verify", "PUT", payload);
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Email Confirmed. Proceed to login.");
    } else {
      toast.error(data.response.data.error);
    }
  };

  return {
    loading,
    success,
    verify,
  };
};

export const useRequestNewToken = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let request = async (payload: { email: string }) => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      "/org/token/verify-email",
      "PUT",
      payload
    );

    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success(
        "A new verification token has been sent to your email. Check your inbox."
      );
    } else {
      toast.error(data.response.data.message);
    }
  };

  return {
    loading,
    success,
    request,
  };
};

export const useRequestPasswordReset = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let requestReset = async (payload: { email: string }) => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi(
      "/org/token/reset-token",
      "PUT",
      payload
    );

    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Email sent. Check your inbox.");
    } else {
      toast.error("Something went wrong. Please try again");
    }
  };

  return {
    loading,
    success,
    requestReset,
  };
};

export const usePasswordReset = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let resetPassword = async (payload: { email: string }) => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      "/org/reset-password",
      "PUT",
      payload
    );

    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Password reset. Proceed to login.");
    } else {
      toast.error("Something went wrong. Please try again");
    }
  };

  return {
    loading,
    success,
    resetPassword,
  };
};

function getRegistrationError(e: any): string {
  let response = "";
  if (e.response.data.email) {
    response += e.response.data.email + "\n";
  }

  if (e.response.data.username) {
    response += e.response.data.username + "\n";
  }

  if (e.response.data.name) {
    response += e.response.data.name + "\n";
  }

  if (e.response.password) {
    response += e.response.data.password + "\n";
  }

  return response.length === 0
    ? "An error occurred while creating your account. Please try again later."
    : response;
}

function getLoginError(e: any): string {
  let response = "";
  if (e.response.data.username) {
    response += e.response.data.username + "\n";
  }

  if (e.response.data.password) {
    response += e.response.data.password + "\n";
  }

  if (e.response.data.message) {
    response += e.response.data.message + "\n";
  }

  return response.length === 0
    ? "An error occurred while logging you in. Please try again later."
    : response;
}
