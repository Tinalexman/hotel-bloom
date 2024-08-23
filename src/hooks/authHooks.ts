import { useState } from "react";

import { login } from "../services/authServices";
import { SUREAGRO_KEY } from "../services/base";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  let fn = async (
    payload: { email: string; password: string; route: "admin" | "manager" },
    onSuccess?: () => void,
    onError?: () => void
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await login(payload.email, payload.password, payload.route);
      console.log(data);
      window.localStorage.setItem(SUREAGRO_KEY, JSON.stringify(data));
      toast.success("Welcome to Sure Agro");
      setSuccess(true);
      setLoading(false);
      if (onSuccess) onSuccess();
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error("Something went wrong loggin you in. Please try again");
      if (onError) onError();
    }
  };

  return {
    loading,
    success,
    fn,
  };
};
