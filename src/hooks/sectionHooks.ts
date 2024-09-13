import { useEffect, useState } from "react";
import { useAxios } from "../services/base";
import toast from "react-hot-toast";
import { useDashboardData } from "../stores/dashboardStore";
import { tSection } from "../stores/sectionStore";

export const useCreateSection = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let register = async (name: string) => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi("/org/sections", "POST", { name });
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("New Section Created");
      useDashboardData.getState().refresh();
    } else {
      toast.error("Something went wrong. Please try again");
    }
  };

  return {
    loading,
    success,
    register,
  };
};

export const useDeleteSection = (section_id: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let del = async () => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi(
      `/org/sections/${section_id}`,
      "DELETE"
    );
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Section Deleted");
      useDashboardData.getState().refresh();
    } else {
      toast.error("Something went wrong. Please try again");
    }
  };

  return {
    loading,
    success,
    del,
  };
};

export const useGetAllSections = () => {
  const [data, setData] = useState<tSection[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const refresh = useDashboardData((state) => state.shouldRefresh);

  let get = async () => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi("/org/sections", "GET");
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Sections Retrieved");
      setData(data as tSection[]);
    } else {
      toast.error("Something went wrong. Please try again");
    }
  };

  useEffect(() => {
    get();
  }, [refresh]);

  return {
    loading,
    success,
    data,
    get,
  };
};
