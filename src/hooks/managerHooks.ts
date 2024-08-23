import { useEffect, useState } from "react";
import {
  createManager,
  getAllManagers,
  iCreateManagerPayload,
  updateManagerStatus,
} from "../services/managerServices";
import { useDashboardData } from "../stores/dashboardStore";
import { tManager } from "../stores/managerStore";
import toast from "react-hot-toast";
import { useCurrentAdminStore } from "../stores/adminStore";

export const useGetAllManagers = () => {
  const [managers, setManagers] = useState<tManager[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [totalCount, setCount] = useState<number>(0);
  const [totalPages, setPages] = useState<number>(0);

  const token = useCurrentAdminStore((state) => state.token);
  const search = useDashboardData((state) => state.searchFilter);
  const refresh = useDashboardData((state) => state.shouldRefresh);

  let fn = async () => {
    setLoading(true);

    try {
      const data = await getAllManagers(token, search);
      let mappedManagers: tManager[] = data.data.map((dt: any, i: number) => {
        return {
          id: dt.id,
          firstName: dt.firstName,
          lastName: dt.lastName,
          email: dt.email,
          businessName: dt.businessName,
          active: dt.status === "active",
          createdAt: dt.createdAt,
        };
      });
      setManagers(mappedManagers);
      setSuccess(true);
      setLoading(false);
      //   setCount(Number.parseInt(data.count));
      //   setPages(Number.parseInt(data.pages));
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        "Something went wrong fetching all managers. Please try again"
      );
    }
  };

  useEffect(() => {
    fn();
  }, [search, refresh]);

  return {
    managers,
    loading,
    success,
    totalCount,
    totalPages,
  };
};

export const useCreateManager = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const token = useCurrentAdminStore((state) => state.token);

  let create = async (
    payload: iCreateManagerPayload,
    callback?: () => void
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      await createManager(token, payload);
      setSuccess(true);
      setLoading(false);
      toast.success("Manager created successfully");
      useDashboardData.getState().refresh();
      if (callback) callback();
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        "Something went wrong creating your manager. Please try again"
      );
    }
  };

  return {
    loading,
    success,
    create,
  };
};

export const useUpdateManagerStatus = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const token = useCurrentAdminStore((state) => state.token);

  let update = async (
    email: string,
    operation: "enableManager" | "disableManager",
    callback?: () => void
  ) => {
    if (loading) return;
    setLoading(true);
    let op = operation === "enableManager" ? "enabled" : "disabled";
    let op_ing = operation === "enableManager" ? "enabling" : "disabling";

    try {
      await updateManagerStatus(token, email, operation);
      setSuccess(true);
      setLoading(false);
      toast.success(`Manager ${op} successfully`);
      useDashboardData.getState().refresh();
      if (callback) callback();
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        `Something went wrong ${op_ing} your manager. Please try again`
      );
    }
  };

  return {
    loading,
    success,
    update,
  };
};
