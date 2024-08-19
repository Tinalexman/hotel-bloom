"use client";

import { useEffect } from "react";

import DashboardNavigation from "@/src/components/dashboard/DashboardNavigation";
import { convertDate, getTimeOfDay } from "@/src/functions/dateFunctions";

import Image from "next/image";

import { FiSearch } from "react-icons/fi";
import { RiNotification2Line } from "react-icons/ri";

import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa6";

import { useMantineColorScheme } from "@mantine/core";
import { ReactNode } from "react";
import { useDashboardData } from "@/src/stores/dashboardStore";
import Overview from "@/src/components/dashboard/overview/Overview";
import Categories from "@/src/components/dashboard/categories/Categories";
import Products from "@/src/components/dashboard/products/Products";
import Partners from "@/src/components/dashboard/partners/Partners";
import Settings from "@/src/components/dashboard/settings/Settings";
import Admins from "./admins/Admins";

import { useCurrentAdminStore } from "@/src/stores/adminStore";
import { SUREAGRO_KEY } from "@/src/services/base";

import { toast, Toaster } from "react-hot-toast";

import { jwtDecode } from "jwt-decode";

interface iUserData {
  token: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

const Dashboard = () => {
  const { setColorScheme } = useMantineColorScheme();
  let currentDate: Date = new Date();

  const index = useDashboardData((state) => state.page);
  const search = useDashboardData((state) => state.searchFilter);
  const id = useCurrentAdminStore((state) => state.id);

  const children: ReactNode[] = [
    <Overview key={"Overview"} />,
    <Categories key={"Categories"} />,
    <Products key={"Products"} />,
    <Admins key={"Admins"} />,
    <Partners key={"Partners"} />,
    <Settings key={"Settings"} />,
  ];

  const init = async () => {
    let data = window.localStorage.getItem(SUREAGRO_KEY);
    if (data === null) {
      toast.error("You need to login to your SureAgro account");
      setTimeout(() => {
        window.location.replace("/auth/login");
      }, 1000);
      return;
    }

    let user: iUserData = JSON.parse(data);
    let decodedToken = jwtDecode(user.token);

    const expTimeInSeconds = decodedToken.exp;
    if (expTimeInSeconds !== undefined) {
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      if (currentTimeInSeconds >= expTimeInSeconds) {
        toast.error("Please login to your SureAgro account");
        setTimeout(() => {
          window.location.replace("/auth/login");
        }, 1000);
        return;
      }
    }

    useCurrentAdminStore.setState({
      email: user.email,
      active: true,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      token: user.token,
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Toaster />
      <div className="w-[100vw] h-[100vh] flex dark:bg-monokai bg-white">
        <DashboardNavigation />
        <div className="w-full h-[100vh] flex flex-col px-8 py-5 bg-slate-50 dark:bg-monokai-faded">
          <div className="h-[100px] w-full flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="big-3 font-bold">
                {getTimeOfDay(currentDate)}, 🥳
              </h1>
              <p className="text-md font-medium text-monokai dark:text-white">
                {convertDate(currentDate)}
              </p>
            </div>

            <div className="w-fit flex items-center gap-5">
              {index !== 0 && index !== children.length - 1 && (
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
              )}
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
          {children[index]}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
