import { useEffect, useState } from "react";
import {
  createAdmin,
  getAllAdmins,
  iCreateAdminPayload,
  updateAdminStatus,
} from "../services/adminServices";
import { useDashboardData } from "../stores/dashboardStore";
import { tAdmin, useCurrentAdminStore } from "../stores/adminStore";
import toast from "react-hot-toast";

export const useGetAllAdmins = () => {
  const [admins, setAdmins] = useState<tAdmin[]>([]);
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
      const data = await getAllAdmins(token, search);
      let mappedAdmins: tAdmin[] = data.data.map((dt: any, i: number) => {
        return {
          id: dt.id,
          firstName: dt.firstName,
          lastName: dt.lastName,
          email: dt.email,
          active: dt.status === "active",
          createdAt: dt.createdAt,
          token: "",
        };
      });
      setAdmins(mappedAdmins);
      setSuccess(true);
      setLoading(false);
      setCount(Number.parseInt(data.count));
      setPages(Number.parseInt(data.pages));
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error("Something went wrong fetching all admins. Please try again");
    }
  };

  useEffect(() => {
    fn();
  }, [search, refresh]);

  return {
    admins,
    loading,
    success,
    totalCount,
    totalPages,
  };
};

export const useCreateAdmin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const token = useCurrentAdminStore((state) => state.token);

  let create = async (payload: iCreateAdminPayload, callback?: () => void) => {
    if (loading) return;
    setLoading(true);

    try {
      await createAdmin(token, payload);
      setSuccess(true);
      setLoading(false);
      toast.success("Admin created successfully");
      useDashboardData.getState().refresh();
      if (callback) callback();
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error("Something went wrong creating your admin. Please try again");
    }
  };

  return {
    loading,
    success,
    create,
  };
};

export const useUpdateAdminStatus = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const token = useCurrentAdminStore((state) => state.token);

  let update = async (
    email: string,
    operation: "enableAdmin" | "disableAdmin",
    callback?: () => void
  ) => {
    if (loading) return;
    setLoading(true);
    let op = operation === "enableAdmin" ? "enabled" : "disabled";
    let op_ing = operation === "enableAdmin" ? "enabling" : "disabling";

    try {
      await updateAdminStatus(token, email, operation);
      setSuccess(true);
      setLoading(false);
      toast.success(`Admin ${op} successfully`);
      useDashboardData.getState().refresh();
      if (callback) callback();
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        `Something went wrong ${op_ing} your admin. Please try again`
      );
    }
  };

  return {
    loading,
    success,
    update,
  };
};
