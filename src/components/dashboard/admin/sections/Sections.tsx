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
import { tSection } from "@/src/stores/sectionStore";
import ViewSection from "./ViewSection";
import { useCurrentStaffStore } from "@/src/stores/userStore";
import SectionContainer from "./SectionContainer";

const Sections = () => {
  const [addSection, shouldAddSection] = useState<boolean>(false);
  const { data: sections, loading } = useGetAllSections();

  const [currentSection, setCurrentSection] = useState<tSection | null>(null);
  const hasCreateSectionPermission = useCurrentStaffStore(
    (state) => state.permissions.create_section
  );
  const managedSections = useCurrentStaffStore(
    (state) => state.permissions.managed_sections
  );

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
            {hasCreateSectionPermission && (
              <button
                onClick={() => shouldAddSection(true)}
                className="rounded-[10px] bg-secondary text-white p-2 shadow-custom-black"
              >
                <IoAdd size={"26px"} />
              </button>
            )}
          </div>
        </div>
        {!loading && sections.length > 0 && (
          <div className="w-full grid grid-cols-5 gap-6">
            {sections.map((sc, i) => (
              <SectionContainer
                key={i}
                section={sc}
                onSelect={() => setCurrentSection(sc)}
              />
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
