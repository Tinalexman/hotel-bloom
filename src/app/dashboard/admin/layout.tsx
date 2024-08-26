"use client";

import React, { FC, ReactNode, useState } from "react";

import DashboardNavigation from "@/src/components/dashboard/admin/Navigation";
import { convertDate, getTimeOfDay } from "@/src/functions/dateFunctions";

import Image from "next/image";

import { FiSearch } from "react-icons/fi";
import { RiNotification2Line } from "react-icons/ri";

import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa6";

import { useMantineColorScheme } from "@mantine/core";
import { useDashboardData } from "@/src/stores/dashboardStore";

import { useCurrentAdminStore } from "@/src/stores/adminStore";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { setColorScheme } = useMantineColorScheme();
  let currentDate: Date = new Date();

  const search = useDashboardData((state) => state.searchFilter);
  const id = useCurrentAdminStore((state) => state.id);

  return (
    <div className="w-[100vw] h-[100vh] flex ">
      <DashboardNavigation />
      <div
        className={`flex flex-col bg-slate-50 dark:bg-monokai-faded duration-300 transition-all ease-in w-full h-[100vh] overflow-y-scroll`}
      >
        <div
          className={`h-[100px]  
          w-full z-50 py-5 px-8 shadow-custom-black dark:shadow-custom-white flex items-center justify-between`}
        >
          <div className="flex flex-col gap-1">
            <h1 className="big-3 font-bold">{getTimeOfDay(currentDate)} 🥳</h1>
            <p className="text-md font-medium text-monokai dark:text-white">
              {convertDate(currentDate)}
            </p>
          </div>

          <div className="w-[250px] relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4"
              value={search}
              onChange={(e) => {
                useDashboardData.setState({
                  searchFilter: e.target.value,
                });
              }}
            />
            <FiSearch
              className="text-contrast-base absolute top-[10px] left-2"
              size={"20px"}
            />
          </div>
        </div>
        <div className="px-8">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
