import React from "react";

import { useDashboardData } from "@/src/stores/dashboardStore";

import { AiFillProduct } from "react-icons/ai";
import { TbReorder } from "react-icons/tb";
import { FaServicestack } from "react-icons/fa6";
import { MdDonutSmall } from "react-icons/md";

interface iOverviewStats {
  title: string;
  value: number;
  color: string;
  icon: any;
}

const Stats = () => {
  const stats: iOverviewStats[] = [
    {
      title: "Products",
      value: 4,
      color: "#A8DF4C",
      icon: <AiFillProduct size={"48px"} className="text-primary-shade-1" />,
    },
    {
      title: "Orders",
      value: 2,
      color: "#E5DC5F",
      icon: <TbReorder size={"48px"} className="text-primary-shade-2" />,
    },
    {
      title: "Services",
      value: 10,
      color: "#FFDA83",
      icon: <FaServicestack size={"48px"} className="text-primary-shade-3" />,
    },
    {
      title: "Users",
      value: 16,
      color: "#1D4875",
      icon: <MdDonutSmall size={"48px"} className="text-secondary" />,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-8 w-full pt-10">
      {stats.map((stat, index) => {
        return (
          <div
            style={{
              backgroundColor: stat.color,
            }}
            className={`relative w-full h-[150px] flex justify-start items-center shadow-custom-black rounded-[20px] overflow-hidden`}
            key={index}
          >
            <div
              className={`w-[180px] h-full rounded-tr-[60px] rounded-br-[60px] ${
                index === 3 ? "bg-white" : "bg-monokai"
              } flex justify-center items-center`}
            >
              {stat.icon}
            </div>
            <div className="w-full h-full p-4 flex flex-col justify-around">
              <h4
                className={`text-lg font-[700] ${
                  index === 3 ? "text-white" : "text-monokai"
                }`}
              >
                {stat.title}
              </h4>
              <h2
                className={`text-6xl ${
                  index === 3 ? "text-white" : "text-monokai"
                } font-bold`}
              >
                {stat.value}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
