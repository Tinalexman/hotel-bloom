"use client";

import React, { FC, ReactNode, useState } from "react";

import DashboardNavigation from "@/src/components/dashboard/manager/Navigation";
import { convertDate, getTimeOfDay } from "@/src/functions/dateFunctions";

import Image from "next/image";

import { FiSearch } from "react-icons/fi";
import { RiNotification2Line } from "react-icons/ri";

import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa6";

import { useMantineColorScheme } from "@mantine/core";
import { useDashboardData } from "@/src/stores/dashboardStore";

import { useCurrentManagerStore } from "@/src/stores/managerStore";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { setColorScheme } = useMantineColorScheme();
  let currentDate: Date = new Date();

  const search = useDashboardData((state) => state.searchFilter);
  const id = useCurrentManagerStore((state) => state.id);

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

          <div className="w-fit flex items-center gap-5">
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
            <div className="size-10 rounded-[10px] shadow-custom-black dark:shadow-custom-white cursor-pointer flex justify-center items-center bg-white dark:bg-monokai">
              <RiNotification2Line
                size={"26px"}
                className="text-monokai dark:text-white"
              />
            </div>

            <div className="block dark:hidden">
              <FaMoon
                onClick={() => setColorScheme("dark")}
                size={"22px"}
                className="text-monokai cursor-pointer"
              />
            </div>

            <div className="hidden dark:block">
              <FaSun
                onClick={() => setColorScheme("light")}
                size={"22px"}
                className="text-white cursor-pointer"
              />
            </div>

            <Image
              src={`https://gravatar.com/avatar/${id}?s=400&d=robohash&r=x`}
              alt="profile-picture"
              width={50}
              height={50}
              className="object-cover size-10 rounded-[10px] dark:shadow-custom-white shadow-custom-black"
            />
          </div>
        </div>
        <div className="px-8">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
