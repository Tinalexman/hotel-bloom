"use client";

import React, { useState } from "react";

import { IoAdd } from "react-icons/io5";
import Image from "next/image";
import Void from "@/public/Void.png";
import { Loader } from "@mantine/core";
import { MdRefresh } from "react-icons/md";
import { useDashboardData } from "@/src/stores/dashboardStore";
import AddSection from "./AddSection";

const Sections = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [addSection, shouldAddSection] = useState<boolean>(false);
  const loading = false;

  return (
    <>
      {addSection && <AddSection onClose={() => shouldAddSection(false)} />}
      <div className="w-full h-full pt-5 flex flex-col">
        <div className="w-full h-[100px] flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="big-4 font-medium text-monokai">
              Sections <span className="big-3 font-bold">(0)</span>
            </h2>
            <p className="text-lg text-neutral-dark">
              Manage all your sections
            </p>
          </div>
          <div className="w-fit gap-3 flex items-center">
            <button
              onClick={() => useDashboardData.getState().refresh()}
              className="rounded-[10px] bg-neutral-light text-monokai p-2 shadow-custom-black"
            >
              <MdRefresh size={"26px"} />
            </button>
            <button
              onClick={() => shouldAddSection(true)}
              className="rounded-[10px] bg-secondary text-white p-2 shadow-custom-black"
            >
              <IoAdd size={"26px"} />
            </button>
          </div>
        </div>
        {!loading && sections.length > 0 && (
          <div className="w-full grid grid-cols-4 gap-6 px-4 py-[5px]">{}</div>
        )}
        {!loading && sections.length === 0 && (
          <div className="w-full h-[calc(100vh-100px)] flex flex-col justify-center gap-5 items-center">
            <Image
              src={Void}
              alt="no sections"
              className="size-[200px] object-cover"
            />
            <p className="large-1 text-neutral-dark ">No sections available</p>
          </div>
        )}
        {loading && (
          <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
            <Loader color="myColor.9" />
          </div>
        )}
      </div>
    </>
  );
};

export default Sections;
