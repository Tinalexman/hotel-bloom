import { useEffect, useState } from "react";
import { useAxios } from "../services/base";
import toast from "react-hot-toast";
import { iStaff } from "../stores/userStore";
import { useDashboardData } from "../stores/dashboardStore";

export interface iCreateStaffPayload {
  password: string;
  username?: string;
}

export interface iUpdateStaffPayload {
  staff_id: string;
  password?: string;
  username?: string;
}

export interface iAddPermissionPayload {
  permission: string;
  user: string;
  section?: string;
  update_access?: boolean;
}

export const useCreateStaff = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let register = async (payload: iCreateStaffPayload) => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi("/org/staffs", "POST", payload);
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("New Staff Created");
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

export const useUpdateStaff = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let update = async (payload: iUpdateStaffPayload) => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      `/org/staffs/${payload.staff_id}`,
      "PUT",
      payload
    );
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Staff Details Updated");
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

export const useDeleteStaff = (staff_id: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let del = async () => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi(`/org/staffs/${staff_id}`, "DELETE");
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Staff Deleted");
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

export const useGetAllStaffs = () => {
  const [data, setData] = useState<iStaff[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  const refresh = useDashboardData((state) => state.shouldRefresh);

  let get = async () => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi("/org/staffs", "GET");
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Staffs Retrieved");
      setData(data as iStaff[]);
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

export const useAddStaffPermission = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let add = async (payload: iAddPermissionPayload) => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi(
      "/org/staffs/permissions",
      "POST",
      payload
    );
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Permissions Added");
      useDashboardData.getState().refresh();
    } else {
      toast.error("Something went wrong. Please try again");
    }
  };

  return {
    loading,
    success,
    add,
  };
};
