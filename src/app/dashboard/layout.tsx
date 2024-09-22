"use client";

import React, { FC, ReactNode } from "react";

import DashboardNavigation from "@/src/components/dashboard/Navigation";
import { useDashboardData } from "@/src/stores/dashboardStore";
import { convertDate, getTimeOfDay } from "@/src/functions/dateFunctions";
import { FiSearch } from "react-icons/fi";
import { useCurrentStaffStore } from "@/src/stores/userStore";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  let currentDate: Date = new Date();
  const search = useDashboardData((state) => state.searchFilter);
  const username = useCurrentStaffStore((state) => state.username);

  return (
    <div className="w-[100vw] h-[100vh] flex ">
      <DashboardNavigation />
      <div
        className={`flex flex-col bg-white duration-300 transition-all ease-in w-full h-[100vh] overflow-y-scroll`}
      >
        <div
          className={`h-[100px]  
          w-full z-50 py-5 px-8 shadow-custom-black flex items-center justify-between`}
        >
          <div className="flex flex-col gap-1 ">
            <h1 className="big-3 font-bold text-monokai">
              {getTimeOfDay(currentDate)}, {username} 🥳
            </h1>
            <p className="text-md font-medium text-neutral-dark">
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
          </div>
        </div>
        <div className="px-8">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
