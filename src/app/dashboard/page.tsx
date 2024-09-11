"use client";

import React, { useEffect } from "react";

import { useCurrentStaffStore } from "@/src/stores/userStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const currentStaff = useCurrentStaffStore((state) => state);
  const viewLog = useCurrentStaffStore((state) => state.permissions.view_log);
  const createSection = useCurrentStaffStore(
    (state) => state.permissions.create_section
  );
  const manageInventory = useCurrentStaffStore(
    (state) => state.permissions.manage_inventory
  );
  const manageStaff = useCurrentStaffStore(
    (state) => state.permissions.manage_staff
  );

  useEffect(() => {
    let home = "";

    if (createSection && home.length === 0) {
      home = "sections";
    }
    if (manageInventory && home.length === 0) {
      home = "inventory";
    }

    if (manageStaff && home.length === 0) {
      home = "staff";
    }

    if (viewLog && home.length === 0) {
      home = "logs";
    }

    if (home.length === 0) {
      toast.error("Permissions not assigned by super user");
    } else {
      router.replace(`/dashboard/${home}`);
    }
  }, [currentStaff]);

  return <></>;
};

export default Dashboard;
