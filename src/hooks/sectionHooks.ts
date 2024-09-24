import { useEffect, useState } from "react";
import { useAxios } from "../services/base";
import toast from "react-hot-toast";
import { useDashboardData } from "../stores/dashboardStore";
import { tSection } from "../stores/sectionStore";

export interface iCreateSectionInventory {
  section: string;
  inventory: string;
  quantity: number;
  price: number;
}

export interface iSectionNameAndID {
  id: string;
  name: string;
}

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

export const useCreateSectionInventory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let create = async (payload: iCreateSectionInventory) => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi(
      "/org/sections/inventories",
      "POST",
      payload
    );
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("New Section Inventory Created");
      useDashboardData.getState().refresh();
    } else {
      toast.error("Something went wrong. Please try again");
    }
  };

  return {
    loading,
    success,
    create,
  };
};

export const useGetAllSectionsExcludingUserOrInventory = (
  id: string,
  query: "user" | "inventory"
) => {
  const [data, setData] = useState<iSectionNameAndID[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let get = async () => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      `/org/sections/exclude?${query}=${id}`,
      "GET"
    );
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Sections Retrieved");
      setData(data as iSectionNameAndID[]);
    } else {
      toast.error("Something went wrong. Please try again");
    }
  };

  useEffect(() => {
    get();
  }, []);

  return {
    loading,
    success,
    data,
    get,
  };
};
