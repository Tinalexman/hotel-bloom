"use client";

import React from "react";

import Stats from "./Stats";
import Graph from "./Graph";
import Performance from "./Performance";

const Overview = () => {
  return (
    <div className="w-full mt-5 flex flex-col gap-8">
      <Stats />
      <div className="w-full h-[400px] flex gap-8">
        <Graph />
        <Performance />
      </div>
      <div className="h-5" />
    </div>
  );
};

export default Overview;
