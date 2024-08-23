import React, { FC, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
import { HiGift, HiOutlineGift } from "react-icons/hi";
import {
  MdLocalOffer,
  MdOutlineLocalOffer,
  MdOutlinePeopleOutline,
  MdPeople,
} from "react-icons/md";
import { useDashboardData } from "@/src/stores/dashboardStore";
import Tooltip from "@/src/components/reusable/Tooltip";
import { SUREAGRO_KEY } from "@/src/services/base";

export interface iNavigationItem {
  name: string;
  active: any;
  inactive: any;
  link: string;
}

const DashboardNavigation = () => {
  const navs: iNavigationItem[] = [
    {
      name: "Overview",
      active: <TbLayoutDashboardFilled size={"26px"} />,
      inactive: <TbLayoutDashboard size={"26px"} />,
      link: "/dashboard/admin/overview",
    },
    {
      name: "Categories",
      active: <HiGift size={"26px"} />,
      inactive: <HiOutlineGift size={"26px"} />,
      link: "/dashboard/admin/categories",
    },
    {
      name: "Products",
      active: <MdLocalOffer size={"26px"} />,
      inactive: <MdOutlineLocalOffer size={"26px"} />,
      link: "/dashboard/admin/products",
    },
    {
      name: "Admins",
      active: <BsPeopleFill size={"26px"} />,
      inactive: <BsPeople size={"26px"} />,
      link: "/dashboard/admin/admins",
    },
    {
      name: "Managers",
      active: <MdPeople size={"26px"} />,
      inactive: <MdOutlinePeopleOutline size={"26px"} />,
      link: "/dashboard/admin/managers",
    },
    {
      name: "Partners",
      active: <HiUserGroup size={"26px"} />,
      inactive: <HiOutlineUserGroup size={"26px"} />,
      link: "/dashboard/admin/partners",
    },
    {
      name: "Settings",
      active: <TbSettingsFilled size={"26px"} />,
      inactive: <TbSettings size={"26px"} />,
      link: "/dashboard/admin/settings",
    },
  ];

  const bottomSection: iNavigationItem[] = [
    {
      name: "Logout",
      active: <TbLogout2 size={"26px"} />,
      inactive: <TbLogout2 size={"26px"} />,
      link: "",
    },
  ];

  const [hoveredItem, setHoveredItem] = useState<number>(0);

  const pathName = usePathname();

  const determineIndex = () => {
    const current = pathName.split("/")[3];
    switch (current) {
      case "overview":
        return 0;
      case "categories":
        return 1;
      case "products":
        return 2;
      case "admins":
        return 3;
      case "managers":
        return 4;
      case "partners":
        return 5;
      case "settings":
        return 6;
    }

    return -1;
  };

  const page = determineIndex();
  const expanded = useDashboardData((state) => state.expanded);

  const logout = () => {
    window.localStorage.removeItem(SUREAGRO_KEY);
    window.location.replace("/auth/login");
  };

  return (
    <div
      className={`${
        expanded ? "w-[300px] pl-5" : "w-[70px] px-3"
      } h-[100vh] z-10 pt-5 duration-300 transition-all ease-in flex flex-col gap-8 items-center dark:shadow-custom-white shadow-custom-black bg-white dark:bg-monokai`}
    >
      <div className="relative w-full flex justify-center pt-10">
        <div
          className={`${
            expanded ? "scale-100" : "scale-0"
          } w-fit object-cover duration-300 transition-all ease-out flex flex-col items-center`}
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
          onClick={() => {
            useDashboardData.setState({ expanded: !expanded });
          }}
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
            <Link
              key={i}
              href={navItem.link}
              className="flex w-full gap-[6px] items-center"
            >
              <div
                onMouseEnter={() => {
                  if (hoveredItem !== i) {
                    setHoveredItem(i);
                  }
                }}
                onMouseLeave={() => setHoveredItem(-1)}
                className={`w-full flex py-2 px-2 rounded-[10px] gap-2 items-center cursor-pointer hover:bg-primary ${
                  page === i
                    ? "bg-neutral-light dark:bg-neutral-dark text-monokai dark:text-white dark:shadow-custom-white shadow-custom-black"
                    : "text-monokai-faded dark:text-slate-300"
                }   hover:scale-105 scale-100 transition-all ease-out duration-200 relative`}
              >
                <div style={{ fontSize: "26px" }}>
                  {page === i && navItem.active}
                  {page !== i && navItem.inactive}
                </div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre text-md duration-500 ${
                    page === i ? "font-[700]" : "font-medium"
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
                  page === i && "bg-primary"
                }`}
              />
            </Link>
          );
        })}
      </div>
      <div className={`flex flex-col w-full gap-2`}>
        {bottomSection.map((navItem: iNavigationItem, i: number) => {
          return (
            <div
              key={i + navs.length}
              className="flex w-full gap-[6px] items-center"
            >
              <div
                onMouseEnter={() => {
                  if (i + navs.length !== hoveredItem) {
                    setHoveredItem(i + navs.length);
                  }
                }}
                onMouseLeave={() => setHoveredItem(-1)}
                onClick={() => {
                  if (i === bottomSection.length - 1) {
                    logout();
                  }
                }}
                className={`w-full flex py-2 px-2 rounded-[10px] gap-2 items-center cursor-pointer hover:bg-primary ${
                  page === i + navs.length
                    ? "bg-neutral-light dark:bg-neutral-dark text-monokai dark:text-white dark:shadow-custom-white shadow-custom-black"
                    : "text-monokai-faded dark:text-slate-300"
                }  hover:scale-105 scale-100 transition-all ease-out duration-200`}
              >
                <div style={{ fontSize: "26px" }}>
                  {page === i + navs.length && navItem.active}
                  {page !== i + navs.length && navItem.inactive}
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
                  page === i + navs.length && "bg-primary"
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
