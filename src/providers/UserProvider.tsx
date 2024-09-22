"use client";

import React, { useEffect } from "react";

import { isEmptyStaff, useCurrentStaffStore } from "@/src/stores/userStore";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathName = usePathname();
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
  const manageSection = useCurrentStaffStore(
    (state) => state.permissions.managed_sections.length > 0
  );

  useEffect(() => {
    if (isEmptyStaff(currentStaff)) return;

    const currentPath = pathName.split("/")[2];

    let invalidPath: boolean = false;
    if (
      !(createSection || manageSection || manageInventory) &&
      currentPath === "sections"
    ) {
      invalidPath = true;
    } else if (!manageInventory && currentPath === "inventory") {
      invalidPath = true;
    } else if (!manageStaff && currentPath === "staff") {
      invalidPath = true;
    } else if (!viewLog && currentPath === "logs") {
      invalidPath = true;
    }

    if (invalidPath) {
      toast.error("You do not have permissions to view this page");
      router.back();
      return;
    }
  }, [currentStaff]);

  return <>{children}</>;
}
