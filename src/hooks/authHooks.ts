import { useState } from "react";
import { useAxios } from "../services/base";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const { requestApi } = useAxios();

  let fn = async (payload: { email: string; password: string }) => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi("/auth", "POST", payload);
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Welcome to Servexi");
      setData(data);
    } else {
      toast.error("Something went wrong. Please try again");
    }
  };

  return {
    loading,
    success,
    fn,
  };
};
