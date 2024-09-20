import { useEffect, useState } from "react";
import { useAxios } from "../services/base";
import toast from "react-hot-toast";
import { useDashboardData } from "../stores/dashboardStore";
import { tInventory } from "../stores/inventoryStore";

export interface iCreateInventoryPayload {
  name: string;
  total_quantity: number;
}

export const useCreateInventory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const create = async (payload: iCreateInventoryPayload) => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi("/org/inventories", "POST", payload);
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Inventory Item Created");
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

export const useUpdateInventory = (inventory_id: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let update = async (quantity: number) => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      `/org/inventories/${inventory_id}`,
      "PUT",
      { quantity }
    );
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Inventory Updated");
      useDashboardData.getState().refresh();
    } else {
      toast.error(
        data.response.data.message ?? "Something went wrong. Please try again"
      );
    }
  };

  return {
    loading,
    success,
    update,
  };
};

export const useDeleteInventory = (inventory_id: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let del = async () => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi(
      `/org/inventories/${inventory_id}`,
      "DELETE"
    );
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Inventory Item Deleted");
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

export const useGetAllInventory = () => {
  const [data, setData] = useState<tInventory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const refresh = useDashboardData((state) => state.shouldRefresh);

  let get = async () => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi("/org/inventories", "GET");
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Inventories Retrieved");
      setData(data as tInventory[]);
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
