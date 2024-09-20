"use client";

import React, { useState } from "react";

import { IoAdd } from "react-icons/io5";
import Image from "next/image";
import Void from "@/public/Void.png";
import { Loader } from "@mantine/core";
import { MdRefresh } from "react-icons/md";
import { useDashboardData } from "@/src/stores/dashboardStore";
import AddSection from "./AddSection";
import { useGetAllSections } from "@/src/hooks/sectionHooks";
import { MdLocalOffer } from "react-icons/md";
import { tSection } from "@/src/stores/sectionStore";
import ViewSection from "./ViewSection";

const Sections = () => {
  const [addSection, shouldAddSection] = useState<boolean>(false);
  const { data: sections, loading } = useGetAllSections();

  const [currentSection, setCurrentSection] = useState<tSection | null>(null);

  return (
    <>
      {addSection && <AddSection onClose={() => shouldAddSection(false)} />}
      {currentSection !== null && (
        <ViewSection
          section={currentSection}
          opened={currentSection !== null}
          close={() => setCurrentSection(null)}
        />
      )}
      <div className="w-full h-full pt-5 flex flex-col">
        <div className="w-full h-[100px] flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="big-4 font-medium text-monokai">
              Sections{" "}
              <span className="big-3 font-bold">({sections.length})</span>
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
          <div className="w-full grid grid-cols-5 gap-6">
            {sections.map((sc, i) => (
              <div
                key={i}
                onClick={() => setCurrentSection(sc)}
                className="w-full hover:scale-105 scale-100 duration-300 ease-out transition-all cursor-pointer overflow-hidden h-40 bg-neutral-light rounded-lg shadow-custom flex flex-col p-2 relative"
              >
                <h2 className="text-xl font-bold text-monokai">{sc.name}</h2>
                <p className="text-lg underline text-monokai">
                  {sc.inventories.length} items
                </p>
                <MdLocalOffer
                  className="text-secondary absolute bottom-0 -left-0 -rotate-90"
                  size={64}
                />
              </div>
            ))}
          </div>
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
