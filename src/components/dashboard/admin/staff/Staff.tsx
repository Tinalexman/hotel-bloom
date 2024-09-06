"use client";

import { Loader } from "@mantine/core";
import React, { useState } from "react";

import { IoAdd } from "react-icons/io5";
import { MdRefresh } from "react-icons/md";

import Image from "next/image";
import Void from "@/public/Void.png";
import { useDashboardData } from "@/src/stores/dashboardStore";
import AddStaff from "./AddStaff";
import { createRandomStaffs, tStaff } from "@/src/stores/staffStore";
import Table from "./Table";

const Staff = () => {
  const [staff, setStaff] = useState<tStaff[]>(createRandomStaffs(10));
  const [addStaff, shouldAddStaff] = useState<boolean>(false);

  const loading = false;

  return (
    <>
      {addStaff && <AddStaff onClose={() => shouldAddStaff(false)} />}

      <div className="w-full h-full pt-5 flex flex-col">
        <div className="flex h-[100px] justify-between items-center">
          <div className="flex flex-col">
            <h2 className="big-4 font-medium text-monokai">
              Staff <span className="big-3 font-bold">({staff.length})</span>
            </h2>
            <p className="text-lg text-neutral-dark">
              Manage your staff all in one place
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
              onClick={() => shouldAddStaff(true)}
              className="rounded-[10px] bg-secondary text-white p-2 shadow-custom-black"
            >
              <IoAdd size={"26px"} />
            </button>
          </div>
        </div>
        {!loading && (
          <div className="w-full max-h-[calc(100vh-245px)]">
            {staff.length > 0 && <Table staff={staff} />}

            {staff.length === 0 && (
              <div className="w-full h-full flex flex-col justify-center gap-5 items-center">
                <Image
                  src={Void}
                  alt="no staffs"
                  className="size-[200px] object-cover"
                />
                <p className="large-1 text-neutral-dark">No staffs available</p>
              </div>
            )}
          </div>
        )}

        {loading && (
          <div className="w-full h-full flex justify-center items-center">
            <Loader color="myColor.9" />
          </div>
        )}
      </div>
    </>
  );
};

export default Staff;
