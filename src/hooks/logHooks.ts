import { useEffect, useState } from "react";
import { useAxios } from "../services/base";
import toast from "react-hot-toast";
import { tLogData } from "../stores/logStore";
import { useDashboardData } from "../stores/dashboardStore";

export const useGetAllLogs = () => {
  const [data, setData] = useState<tLogData>({
    total: 0,
    limit: 0,
    logs: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let get = async (page?: string) => {
    if (loading) return;
    setLoading(true);

    let query = "";
    if (page) {
      query = `?page=${page}&limit=10`;
    }

    const { data, status } = await requestApi(`/org/logs${query}`, "GET");
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Logs Retrieved");
      setData(data as tLogData);
    } else {
      toast.error("Something went wrong. Please try again");
    }
  };

  useEffect(() => {
    get("1");
  }, []);

  return {
    loading,
    success,
    data,
    get,
  };
};
