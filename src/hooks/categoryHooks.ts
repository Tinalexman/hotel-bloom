import { useState, useEffect } from "react";

import {
  getAllCategories,
  createCategory,
  iCreateCategoryPayload,
  iUpdateCategoryPayload,
  updateCategory,
  iUpdateContentPayload,
  updateContent,
  addContent,
  iAddContentPayload,
  deleteContents,
  deleteCategoryWithAllContents,
  deleteCategory,
  iGetContentsResponse,
  getContents,
  iCreateManagerContent,
} from "@/src/services/categoryServices";
import { tServerCategory } from "@/src/stores/categoryStore";
import { useDashboardData } from "@/src/stores/dashboardStore";
import { useCurrentAdminStore } from "@/src/stores/adminStore";
import toast from "react-hot-toast";
import { useCurrentManagerStore } from "../stores/managerStore";

export const useGetAllCategories = () => {
  const [categories, setCategories] = useState<tServerCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const token = useCurrentAdminStore((state) => state.token);
  const search = useDashboardData((state) => state.searchFilter);
  const refresh = useDashboardData((state) => state.shouldRefresh);

  let fn = async () => {
    setLoading(true);

    try {
      const data = await getAllCategories(token, search);
      setCategories(data.data);
      setSuccess(true);
      setLoading(false);
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        "Something went wrong fetching your catgeories. Please try again"
      );
    }
  };

  useEffect(() => {
    fn();
  }, [search, refresh]);

  return {
    categories,
    loading,
    success,
  };
};

export const useGetCategoryContents = (id: string, isManager: boolean) => {
  const [contents, setContents] = useState<iGetContentsResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const managerToken = useCurrentManagerStore((state) => state.token);
  const adminToken = useCurrentAdminStore((state) => state.token);
  const token = isManager ? managerToken : adminToken;

  let fn = async () => {
    setLoading(true);

    try {
      const data = await getContents(token, id, isManager);
      setContents(data);
      setSuccess(true);
      setLoading(false);
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        "Something went wrong fetching the contents of your category. Please try again"
      );
    }
  };

  useEffect(() => {
    fn();
  }, [reload]);

  return {
    contents,
    loading,
    success,
    refresh: () => setReload(!reload),
  };
};

export const useCreateCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const token = useCurrentAdminStore((state) => state.token);

  let create = async (
    payload: iCreateCategoryPayload,
    callback?: () => void
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      await createCategory(token, payload);
      setSuccess(true);
      setLoading(false);
      toast.success("Category created successfully");
      useDashboardData.getState().refresh();
      if (callback) callback();
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        "Something went wrong creating your category. Please try again"
      );
    }
  };

  return {
    loading,
    success,
    create,
  };
};

export const useUpdateCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const token = useCurrentAdminStore((state) => state.token);

  let update = async (
    payload: Partial<iUpdateCategoryPayload>,
    callback?: () => void
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      await updateCategory(token, payload);
      setSuccess(true);
      setLoading(false);
      toast.success("Category updated successfully");
      useDashboardData.getState().refresh();
      if (callback) callback();
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        "Something went wrong updating your category. Please try again"
      );
    }
  };

  return {
    loading,
    success,
    update,
  };
};

export const useUpdateCategoryContent = (isManager: boolean) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const managerToken = useCurrentManagerStore((state) => state.token);
  const adminToken = useCurrentAdminStore((state) => state.token);
  const token = isManager ? managerToken : adminToken;

  let update = async (
    payload: iUpdateContentPayload,
    callback?: () => void
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      await updateContent(token, payload, isManager);
      setSuccess(true);
      setLoading(false);
      toast.success("Category content updated successfully");
      useDashboardData.getState().refresh();
      if (callback) callback();
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        "Something went wrong updating your category content. Please try again"
      );
    }
  };

  return {
    loading,
    success,
    update,
  };
};

export const useAddCategoryContent = (isManager: boolean) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const managerToken = useCurrentManagerStore((state) => state.token);
  const adminToken = useCurrentAdminStore((state) => state.token);
  const token = isManager ? managerToken : adminToken;
  let add = async (
    payload: iAddContentPayload | iCreateManagerContent,
    callback?: () => void
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      await addContent(token, payload, isManager);
      setSuccess(true);
      setLoading(false);
      toast.success("Category content added successfully");
      useDashboardData.getState().refresh();
      if (callback) callback();
    } catch (e: any) {
      setSuccess(false);
      setLoading(false);
      toast.error(e.response.data.message);
    }
  };

  return {
    loading,
    success,
    add,
  };
};

export const useDeleteCategoryContents = (isManager: boolean) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const managerToken = useCurrentManagerStore((state) => state.token);
  const adminToken = useCurrentAdminStore((state) => state.token);
  const token = isManager ? managerToken : adminToken;

  let del = async (payload: string[], callback?: () => void) => {
    if (loading) return;
    setLoading(true);

    try {
      await deleteContents(token, payload, isManager);
      setSuccess(true);
      setLoading(false);
      toast.success(
        isManager
          ? "Content(s) deleted successfully"
          : "Category Content(s) deleted successfully"
      );
      useDashboardData.getState().refresh();
      if (callback) callback();
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        "Something went wrong deleting your contents. Please try again"
      );
    }
  };

  return {
    loading,
    success,
    del,
  };
};

export const useDeleteCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const token = useCurrentAdminStore((state) => state.token);

  let del = async (
    categoryID: string,
    contentIDs: string[],
    callback?: () => void
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      if (contentIDs.length > 0) {
        await deleteCategoryWithAllContents(
          token,
          categoryID,
          contentIDs,
          false
        );
      } else {
        await deleteCategory(token, categoryID);
      }

      setSuccess(true);
      setLoading(false);
      toast.success("Category deleted successfully");
      useDashboardData.getState().refresh();
      if (callback) callback();
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error("Something went wrong. Please try again");
    }
  };

  return {
    loading,
    success,
    del,
  };
};
