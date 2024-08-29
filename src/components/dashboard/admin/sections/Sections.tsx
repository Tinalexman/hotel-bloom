"use client";

import React, { useState } from "react";

import { IoAdd } from "react-icons/io5";
import Image from "next/image";
import Void from "@/public/Void.png";
import { Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MdRefresh } from "react-icons/md";
import { useDashboardData } from "@/src/stores/dashboardStore";

const Sections = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [viewing, { open: openView, close: closeView }] = useDisclosure(false);
  const [index, setIndex] = useState<number>(-1);

  const [sections, setSections] = useState<any[]>([]);
  const loading = false;

  const openViewModal = (choice: number) => {
    setIndex(choice);
    openView();
  };

  return (
    <>
      {/* {opened && <AddCategory opened={opened} close={close} />}
      {viewing && (
        <ViewCategory
          opened={viewing}
          close={closeView}
          category={categories[index]}
        />
      )} */}
      <div className="w-full h-full mt-5 flex flex-col gap-10">
        <div className="w-full h-[100px] flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h1 className="big-4">Sections</h1>
            <p className="text-md text-monokai dark:text-white">
              Manage all your sections
            </p>
          </div>
          <div className="flex w-fit gap-3 items-center">
            <button
              onClick={useDashboardData.getState().refresh}
              className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-neutral-light dark:bg-neutral-dark text-monokai dark:text-white px-5 py-2"
            >
              <MdRefresh size={"26px"} />
              Refresh
            </button>
            <button
              onClick={open}
              className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-primary text-monokai dark:text-white px-5 py-2 transition-colors duration-300 ease-out"
            >
              <IoAdd size={"26px"} />
              Create Section
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
            <p className="large-1 text-neutral-dark dark:text-neutral-light">
              No sections available
            </p>
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
