"use client";

import { useGetAllLogs } from "@/src/hooks/logHooks";

import { Loader } from "@mantine/core";
import React from "react";

import { MdRefresh } from "react-icons/md";

import Image from "next/image";
import Void from "@/public/Void.png";
import { useDashboardData } from "@/src/stores/dashboardStore";
import {
  convertDate,
  convertDateWithSlashesAndTime,
} from "@/src/functions/dateFunctions";

const Logs = () => {
  const { loading, data } = useGetAllLogs();

  return (
    <div className="w-full h-full pt-5 flex flex-col">
      <div className="flex h-[100px] justify-between items-center">
        <div className="flex flex-col">
          <h2 className="big-4 font-medium text-monokai">
            Logs <span className="big-3 font-bold">({data.total})</span>
          </h2>
          <p className="text-lg text-neutral-dark">
            Read what your staff members are doing
          </p>
        </div>
        <div className="w-fit gap-3 flex items-center">
          <button
            onClick={() => useDashboardData.getState().refresh()}
            className="rounded-[10px] bg-neutral-light text-monokai p-2 shadow-custom-black"
          >
            <MdRefresh size={"26px"} />
          </button>
        </div>
      </div>
      {!loading && (
        <div className="w-full max-h-[calc(100vh-245px)] overflow-y-scroll scrollbar-thin">
          {data.total > 0 && (
            <div className="flex flex-col gap-5 ">
              {data.logs.map((lg, i) => (
                <div
                  key={i}
                  className="w-full bg-neutral-light rounded-xl p-5 text-monokai flex flex-col"
                >
                  <h2 className="text-xl font-bold text-secondary">
                    {lg.username}
                  </h2>
                  <h2 className="font-semibold">{lg.action}</h2>
                  <h3 className="font-medium text-sm">
                    Timestamp:{" "}
                    <span className="font-medium">
                      {convertDateWithSlashesAndTime(new Date(lg.created_at))}
                    </span>
                  </h3>
                </div>
              ))}
            </div>
          )}

          {data.total === 0 && (
            <div className="w-full h-[calc(100vh-245px)] flex flex-col justify-center gap-5 items-center">
              <Image
                src={Void}
                alt="no logs"
                className="size-[200px] object-cover"
              />
              <p className="large-1 text-neutral-dark">No logs available</p>
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="w-full h-[calc(100vh-245px)] grid place-content-center">
          <Loader color="myColor.9" />
        </div>
      )}
    </div>
  );
};

export default Logs;
