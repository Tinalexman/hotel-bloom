import { useState } from "react";

import { useDashboardData } from "@/src/stores/dashboardStore";
import { useCurrentAdminStore } from "@/src/stores/adminStore";
import toast from "react-hot-toast";

export const useUpdateAdminData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const token = useCurrentAdminStore((state) => state.token);

  let update = async (
    email: string,
    firstName: string,
    lastName: string,
    callback?: () => void
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      // await updateAdminData(token, email, firstName, lastName);
      setSuccess(true);
      setLoading(false);
      toast.success("Details updated successfully");
      useDashboardData.getState().refresh();
      if (callback) callback();
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        "Something went wrong updating your details. Please try again"
      );
    }
  };

  return {
    loading,
    success,
    update,
  };
};

export const useUpdateAdminPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const token = useCurrentAdminStore((state) => state.token);

  let update = async (
    email: string,
    currentPassword: string,
    newPassword: string,
    callback?: () => void
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      // await updateAdminPassword(token, email, currentPassword, newPassword);
      setSuccess(true);
      setLoading(false);
      toast.success("Password updated successfully");
      useDashboardData.getState().refresh();
      if (callback) callback();
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        "Something went wrong updating your password. Please try again"
      );
    }
  };

  return {
    loading,
    success,
    update,
  };
};

export const useUpdateManagerData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const token = useCurrentAdminStore((state) => state.token);

  let update = async (
    email: string,
    firstName: string,
    lastName: string,
    businessName: string,
    callback?: () => void
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      // await updateManagerData(token, email, firstName, lastName, businessName);
      setSuccess(true);
      setLoading(false);
      toast.success("Details updated successfully");
      useDashboardData.getState().refresh();
      if (callback) callback();
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        "Something went wrong updating your details. Please try again"
      );
    }
  };

  return {
    loading,
    success,
    update,
  };
};

export const useUpdateManagerPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const token = useCurrentAdminStore((state) => state.token);

  let update = async (
    email: string,
    currentPassword: string,
    newPassword: string,
    callback?: () => void
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      // await updateManagerPassword(token, email, currentPassword, newPassword);
      setSuccess(true);
      setLoading(false);
      toast.success("Password updated successfully");
      useDashboardData.getState().refresh();
      if (callback) callback();
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        "Something went wrong updating your password. Please try again"
      );
    }
  };

  return {
    loading,
    success,
    update,
  };
};
