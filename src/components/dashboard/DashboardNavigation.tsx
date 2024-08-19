import React, { FC, useState } from "react";

import Image from "next/image";
import Logo from "@/public/Logo.png";

import {
  TbLayoutDashboard,
  TbLayoutDashboardFilled,
  TbSettings,
  TbSettingsFilled,
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
  TbLogout2,
} from "react-icons/tb";

import { BsPeople, BsPeopleFill } from "react-icons/bs";

import { HiUserGroup, HiOutlineUserGroup } from "react-icons/hi2";
import { IoHelp } from "react-icons/io5";
import { HiGift, HiOutlineGift } from "react-icons/hi";
import { MdLocalOffer, MdOutlineLocalOffer } from "react-icons/md";

import { useDashboardData } from "@/src/stores/dashboardStore";
import Tooltip from "../reusable/Tooltip";
import { SUREAGRO_KEY } from "@/src/services/base";

export interface iNavigationItem {
  name: string;
  active: any;
  inactive: any;
}

const DashboardNavigation = () => {
  const navs: iNavigationItem[] = [
    {
      name: "Overview",
      active: <TbLayoutDashboardFilled size={"26px"} />,
      inactive: <TbLayoutDashboard size={"26px"} />,
    },

    {
      name: "Categories",
      active: <HiGift size={"26px"} />,
      inactive: <HiOutlineGift size={"26px"} />,
    },
    {
      name: "Products",
      active: <MdLocalOffer size={"26px"} />,
      inactive: <MdOutlineLocalOffer size={"26px"} />,
    },
    {
      name: "Admins",
      active: <BsPeopleFill size={"26px"} />,
      inactive: <BsPeople size={"26px"} />,
    },
    {
      name: "Partners",
      active: <HiUserGroup size={"26px"} />,
      inactive: <HiOutlineUserGroup size={"26px"} />,
    },
    {
      name: "Settings",
      active: <TbSettingsFilled size={"26px"} />,
      inactive: <TbSettings size={"26px"} />,
    },
  ];

  const bottomSection: iNavigationItem[] = [
    // {
    //   name: "Help",
    //   active: <IoHelp size={"26px"} />,
    //   inactive: <IoHelp size={"26px"} />,
    // },
    {
      name: "Logout",
      active: <TbLogout2 size={"26px"} />,
      inactive: <TbLogout2 size={"26px"} />,
    },
  ];

  const [expanded, setExpanded] = useState<boolean>(true);
  const currentPage = useDashboardData((state) => state.page);
  const [hoveredItem, setHoveredItem] = useState<number>(0);

  const routeToPage = (page: number) => {
    if (page !== 6) {
      useDashboardData.getState().setPage(page);
    } else {
      window.localStorage.removeItem(SUREAGRO_KEY);
      window.location.replace("/auth/login"); // Logout
    }
  };

  return (
    <div
      className={`${
        expanded
          ? "w-[20%] pl-5 rounded-tr-[20px] rounded-br-[20px]"
          : "w-[70px] px-3 rounded-tr-[10px] rounded-br-[10px]"
      } h-[100vh] z-10 pt-5 duration-300 transition-all ease-in flex flex-col gap-10 items-center dark:shadow-custom-white shadow-custom-black bg-white dark:bg-monokai`}
    >
      <div className="relative w-full flex justify-center pt-10">
        <div
          className={`${
            expanded ? "scale-100" : "scale-0"
          } w-fit  object-cover duration-300 transition-all ease-out flex flex-col items-center`}
        >
          <Image
            src={Logo}
            alt="logo"
            className="w-[96px] h-auto object-cover"
          />
          <h2 className="text-monokai dark:text-white text-2xl font-bold">
            SureAgro
          </h2>
        </div>

        <div
          onClick={() => setExpanded(!expanded)}
          className={`cursor-pointer absolute ${
            expanded ? "left-[80%]" : "left-3"
          } -top-2 duration-300 transition-all ease-out`}
        >
          {expanded ? (
            <TbLayoutSidebarLeftCollapseFilled
              size={"26px"}
              className="text-monokai dark:text-white"
            />
          ) : (
            <TbLayoutSidebarRightCollapseFilled
              size={"26px"}
              className="text-monokai dark:text-white"
            />
          )}
        </div>
      </div>
      <div className={`flex flex-col w-full gap-2`}>
        {navs.map((navItem: iNavigationItem, i: number) => {
          return (
            <div key={i} className="flex w-full gap-[6px] items-center">
              <div
                onMouseEnter={() => setHoveredItem(i)}
                onMouseLeave={() => setHoveredItem(-1)}
                onClick={() => {
                  useDashboardData.getState().setPage(i);
                  routeToPage(i);
                }}
                className={`w-full flex py-2 px-2 rounded-[10px] gap-2 items-center cursor-pointer hover:bg-primary ${
                  currentPage === i
                    ? "bg-neutral-light dark:bg-neutral-dark text-monokai dark:text-white dark:shadow-custom-white shadow-custom-black"
                    : "text-monokai-faded dark:text-slate-300"
                }   hover:scale-105 scale-100 transition-all ease-out duration-200 relative`}
              >
                <div style={{ fontSize: "26px" }}>
                  {currentPage === i && navItem.active}
                  {currentPage !== i && navItem.inactive}
                </div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre text-md duration-500 ${
                    currentPage === i ? "font-[700]" : "font-medium"
                  } ${
                    !expanded && "opacity-0 translate-x-28 overflow-hidden "
                  }`}
                >
                  {navItem.name}
                </h2>
                <Tooltip
                  text={navItem.name}
                  visible={!expanded && hoveredItem === i}
                />
              </div>

              <div
                className={`w-[6px] h-8 rounded-bl-[4px] rounded-tl-[4px] ${
                  currentPage === i && "bg-primary"
                }`}
              />
            </div>
          );
        })}
      </div>
      <div className={`flex flex-col w-full gap-2 mt-16`}>
        {bottomSection.map((navItem: iNavigationItem, i: number) => {
          return (
            <div
              key={i + navs.length}
              className="flex w-full gap-[6px] items-center"
            >
              <div
                onMouseEnter={() => setHoveredItem(i + navs.length)}
                onMouseLeave={() => setHoveredItem(-1)}
                onClick={() => {
                  useDashboardData.getState().setPage(i + navs.length);
                  routeToPage(i + navs.length);
                }}
                className={`w-full flex py-2 px-2 rounded-[10px] gap-2 items-center cursor-pointer hover:bg-primary ${
                  currentPage === i + navs.length
                    ? "bg-neutral-light dark:bg-neutral-dark text-monokai dark:text-white dark:shadow-custom-white shadow-custom-black"
                    : "text-monokai-faded dark:text-slate-300"
                }  hover:scale-105 scale-100 transition-all ease-out duration-200`}
              >
                <div style={{ fontSize: "26px" }}>
                  {currentPage === i + navs.length && navItem.active}
                  {currentPage !== i + navs.length && navItem.inactive}
                </div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre text-md duration-500 ${
                    !expanded && "opacity-0 translate-x-28 overflow-hidden "
                  }`}
                >
                  {navItem.name}
                </h2>
                <Tooltip
                  text={navItem.name}
                  visible={!expanded && hoveredItem === i + navs.length}
                />
              </div>

              <div
                className={`w-[6px] h-8 rounded-bl-[4px] rounded-tl-[4px] ${
                  currentPage === i + navs.length && "bg-primary"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardNavigation;
