import { useState } from "react";
import { useAxios } from "../services/base";
import toast from "react-hot-toast";
import { iStaff } from "../stores/userStore";

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
  permission:
    | "View Log"
    | "Create Section"
    | "Manage Inventory"
    | "Manage Section Inventory";
  user: string;
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

  let register = async (payload: iUpdateStaffPayload) => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi(
      `/org/staffs/${payload.staff_id}`,
      "PUT",
      payload
    );
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Staff Details Updated");
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

export const useDeleteStaff = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let del = async (staff_id: string) => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi(`/org/staffs/${staff_id}`, "DELETE");
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Staff Deleted");
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

  let add = async (payload: iCreateStaffPayload) => {
    if (loading) return;
    setLoading(true);

    const { status } = await requestApi("/org/staffs", "POST", payload);
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Permissions Added");
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
