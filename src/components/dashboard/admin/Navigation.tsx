import React, { useState, useEffect } from "react";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import Logo from "@/public/Logo.png";

import { TbLogout2 } from "react-icons/tb";

import { BsClipboard2Pulse, BsClipboard2PulseFill } from "react-icons/bs";
import { BiExpand, BiCollapse } from "react-icons/bi";

import { HiUserGroup, HiOutlineUserGroup } from "react-icons/hi2";
import { HiGift, HiOutlineGift } from "react-icons/hi";
import { MdLocalOffer, MdOutlineLocalOffer } from "react-icons/md";
import { useDashboardData } from "@/src/stores/dashboardStore";
import Tooltip from "@/src/components/reusable/Tooltip";

import { useLogout } from "@/src/hooks/authHooks";
import { isEmptyStaff, useCurrentStaffStore } from "@/src/stores/userStore";
import Logout from "./Logout";

export interface iNavigationItem {
  name: string;
  active: any;
  inactive: any;
  link: string;
}

const DashboardNavigation = () => {
  const currentStaff = useCurrentStaffStore((state) => state);
  const viewLog = useCurrentStaffStore((state) => state.permissions.view_log);
  const createSection = useCurrentStaffStore(
    (state) => state.permissions.create_section
  );
  const manageSection = useCurrentStaffStore(
    (state) => state.permissions.managed_sections.length > 0
  );
  const manageInventory = useCurrentStaffStore(
    (state) => state.permissions.manage_inventory
  );
  const manageStaff = useCurrentStaffStore(
    (state) => state.permissions.manage_staff
  );

  const [navs, setNavs] = useState<iNavigationItem[]>([]);
  const [paths, setPaths] = useState<string[]>([]);

  const [hoveredItem, setHoveredItem] = useState<number>(0);
  const pathName = usePathname();

  const determineIndex = () => {
    const current = pathName.split("/")[2];
    for (let i = 0; i < paths.length; ++i) {
      if (paths[i] === current) {
        return i;
      }
    }
    return -1;
  };

  const page = determineIndex();
  const expanded = useDashboardData((state) => state.expanded);

  const [logout, shouldLogout] = useState<boolean>(false);

  useEffect(() => {
    if (isEmptyStaff(currentStaff)) return;

    let newNavs: iNavigationItem[] = [];
    let newPaths: string[] = [];

    if (createSection || manageSection || manageInventory) {
      newNavs.push({
        name: "Sections",
        active: <MdLocalOffer size={"26px"} />,
        inactive: <MdOutlineLocalOffer size={"26px"} />,
        link: "/dashboard/sections",
      });
      newPaths.push("sections");
    }

    if (manageInventory) {
      newNavs.push({
        name: "Inventory",
        active: <HiGift size={"26px"} />,
        inactive: <HiOutlineGift size={"26px"} />,
        link: "/dashboard/inventory",
      });
      newPaths.push("inventory");
    }

    if (manageStaff) {
      newNavs.push({
        name: "Staff",
        active: <HiUserGroup size={"26px"} />,
        inactive: <HiOutlineUserGroup size={"26px"} />,
        link: "/dashboard/staff",
      });
      newPaths.push("staff");
    }

    if (viewLog) {
      newNavs.push({
        name: "Logs",
        active: <BsClipboard2PulseFill size={"26px"} />,
        inactive: <BsClipboard2Pulse size={"26px"} />,
        link: "/dashboard/logs",
      });
      newPaths.push("logs");
    }

    newNavs.push({
      name: "Logout",
      active: <TbLogout2 size={"26px"} />,
      inactive: <TbLogout2 size={"26px"} />,
      link: "",
    });

    setNavs(newNavs);
    setPaths(newPaths);
  }, [currentStaff]);

  useEffect(() => {
    if (!expanded) {
      setHoveredItem(-1);
    }
  }, [expanded]);

  return (
    <>
      <div
        className={`${
          expanded ? "w-[300px] pl-5" : "w-[70px] px-3"
        } h-[100vh] z-10 pt-5 duration-300 transition-all ease-in flex flex-col gap-8 items-center shadow-custom-black bg-white`}
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
              className="w-[300px] h-auto object-cover"
            />
          </div>

          <div
            onClick={() => {
              useDashboardData.setState({ expanded: !expanded });
            }}
            className={`cursor-pointer absolute ${
              expanded ? "left-[80%]" : "left-3"
            } -top-3 duration-300 transition-all ease-out`}
          >
            {expanded ? (
              <BiCollapse size={"26px"} className="text-monokai" />
            ) : (
              <BiExpand size={"26px"} className="text-monokai" />
            )}
          </div>
        </div>
        <div className={`flex flex-col w-full gap-2`}>
          {navs.map((navItem: iNavigationItem, i: number) => {
            return (
              <div
                key={i}
                onClick={() => {
                  if (i !== navs.length - 1) {
                    window.location.assign(navItem.link);
                  } else {
                    shouldLogout(true);
                  }
                }}
                className="flex w-full gap-[6px] items-center"
              >
                <div
                  onMouseEnter={() => {
                    if (hoveredItem !== i) {
                      setHoveredItem(i);
                    }
                  }}
                  onMouseLeave={() => setHoveredItem(-1)}
                  className={`w-full flex py-2 px-2 rounded-[10px] gap-2 items-center cursor-pointer font-medium ${
                    page === i &&
                    "bg-secondary text-white shadow-custom-black font-bold"
                  } text-monokai hover:scale-105 scale-100 transition-all ease-out duration-200 relative`}
                >
                  <div style={{ fontSize: "26px" }}>
                    {page === i && navItem.active}
                    {page !== i && navItem.inactive}
                  </div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre  duration-500 ${
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
                    page === i && "bg-secondary"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
      {logout && <Logout onClose={() => shouldLogout(false)} />}
    </>
  );
};

export default DashboardNavigation;
