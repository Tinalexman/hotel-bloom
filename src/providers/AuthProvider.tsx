"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SUREAGRO_KEY } from "../services/base";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useCurrentAdminStore } from "../stores/adminStore";
import { useCurrentManagerStore } from "../stores/managerStore";

interface iAdmin {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  status: string;
}

interface iManager {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  status: string;
  businessName: string;
  categoryId: string;
}

const AuthProvider = ({ children }: any) => {
  const router = useRouter();

  let init = async () => {
    let route: string = window.location.pathname;
    let data = window.localStorage.getItem(SUREAGRO_KEY);

    const isProtectedRoute: boolean =
      route.startsWith("/dashboard/admin") ||
      route.startsWith("/dashboard/manager");

    if (!isProtectedRoute) return;

    if (data === null) {
      toast.error("Please login to your SureAgro account");
      router.replace("/auth/login");
      return;
    }

    let user: iAdmin | iManager = JSON.parse(data!);
    let decodedToken = jwtDecode(user.token);

    const expTimeInSeconds = decodedToken.exp;
    if (expTimeInSeconds !== undefined) {
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      if (currentTimeInSeconds >= expTimeInSeconds) {
        toast.error("Please login to your SureAgro account");
        router.replace("/auth/login");
        return;
      }
    }

    if (route.startsWith("/dashboard/manager")) {
      const mng = user as iManager;
      useCurrentManagerStore.setState({
        email: mng.email,
        active: mng.status === "active",
        firstName: mng.firstName,
        lastName: mng.lastName,
        id: mng.id,
        businessName: mng.businessName,
        categoryId: mng.categoryId,
        token: mng.token,
      });
    } else if (route.startsWith("/dashboard/admin")) {
      useCurrentAdminStore.setState({
        email: user.email,
        active: user.status === "active",
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        token: user.token,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
