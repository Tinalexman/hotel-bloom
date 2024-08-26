import React from "react";

import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { AreaChart } from "@mantine/charts";
import { data } from "./data";

const Graph = () => {
  return (
    <div className="p-5 w-[70%] h-full flex flex-col justify-between bg-monokai shadow-custom-white rounded-[20px] overflow-hidden">
      <div className="flex gap-5 w-full items-center justify-between">
        <h1 className="text-white text-3xl">Graph</h1>
        <div className="w-fit gap-3 flex items-center text-slate-300 cursor-pointer">
          <BsFillCalendar2WeekFill size={"16px"} />
          <h2 className="text-md">This Week</h2>
          <IoIosArrowDown size={"16px"} />
        </div>
      </div>

      <AreaChart
        h={300}
        data={data}
        dataKey="date"
        series={[{ name: "Apples", color: "myColor.6" }]}
        curveType="bump"
        gridAxis="none"
        withXAxis={false}
        withYAxis={false}
      />
    </div>
  );
};

export default Graph;
