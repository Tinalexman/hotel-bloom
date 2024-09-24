"use client";

import { useGetAllLogs } from "@/src/hooks/logHooks";

import { Loader } from "@mantine/core";
import React, { useState } from "react";

import { MdRefresh } from "react-icons/md";

import Image from "next/image";
import Void from "@/public/Void.png";
import { convertTime, convertDate } from "@/src/functions/dateFunctions";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import toast from "react-hot-toast";

const Logs = () => {
  const { loading, data, get } = useGetAllLogs();
  const [page, setPage] = useState<string>("1");

  const onPrev = () => {
    if (page === "1") {
      toast.error("This is the first page");
      return;
    }

    const newPage = (parseInt(page) - 1).toString();
    setPage(newPage);
    get(newPage);
  };

  const onNext = () => {
    if (page === Math.ceil(data.total / 10).toString()) {
      toast.error("This is the last page");
      return;
    }

    const newPage = (parseInt(page) + 1).toString();
    setPage(newPage);
    get(newPage);
  };

  const onEnterPressed = (event: any) => {
    if (event.key === "Enter") {
      get(page);
    }
  };

  return (
    <div className="w-full h-full pt-5 flex flex-col">
      <div className="flex h-[100px] justify-between items-center">
        <div className="flex flex-col">
          <h2 className="big-4 font-medium text-monokai">
            Logs <span className="big-3 font-bold">({data.total})</span>
          </h2>
          <p className="text-lg text-neutral-dark">
            View the activities of your organization
          </p>
        </div>
        <div className="w-fit gap-5 flex items-center">
          <div className="w-fit flex items-center gap-2">
            <button
              title="Previous Page"
              onClick={onPrev}
              className="rounded-[10px] bg-neutral-light text-monokai p-2 shadow-custom-black"
            >
              <IoIosArrowBack size={"26px"} />
            </button>

            <div className="flex w-fit gap-1 items-center">
              <input
                type="text"
                value={page}
                placeholder="Page"
                onKeyDown={onEnterPressed}
                className="w-[40px] rounded-[10px] bg-neutral-light text-monokai p-2 shadow-custom-black"
                onChange={(e) => {
                  const res = e.target.value.trim();
                  let n = Number(res);
                  if (!isNaN(n)) {
                    if (n < 0) {
                      toast.error("Invalid Page Number");
                      setPage("1");
                      return;
                    } else {
                      n > Math.ceil(data.total / 10)
                        ? setPage("1")
                        : setPage(n.toString());
                    }
                  }
                }}
              />
              <p className="text-monokai">of {Math.ceil(data.total / 10)}</p>
            </div>

            <button
              title="Next Page"
              onClick={onNext}
              className="rounded-[10px] bg-neutral-light text-monokai p-2 shadow-custom-black"
            >
              <IoIosArrowForward size={"26px"} />
            </button>
          </div>
          <button
            title="Refresh the page"
            onClick={() => get(page)}
            className="rounded-[10px] bg-secondary text-white p-2 shadow-custom-black"
          >
            <MdRefresh size={"26px"} />
          </button>
        </div>
      </div>
      {!loading && (
        <div className="w-full max-h-[calc(100vh-245px)] overflow-y-scroll scrollbar-custom">
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
                    <span className="font-semibold">
                      {convertTime(new Date(lg.created_at))}
                    </span>
                    <span className="font-normal">{" on "}</span>
                    <span className="font-semibold">
                      {convertDate(new Date(lg.created_at))}
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
