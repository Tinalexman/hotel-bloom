"use client";

import { Loader } from "@mantine/core";
import React, { useState } from "react";

import { IoAdd } from "react-icons/io5";
import { MdRefresh } from "react-icons/md";

import Image from "next/image";
import Void from "@/public/Void.svg";
import { useDisclosure } from "@mantine/hooks";
import { useDashboardData } from "@/src/stores/dashboardStore";
import AddManagerModal from "./AddManagerModal";
import { useGetAllManagers } from "@/src/hooks/managerHooks";
import ManagerStatus from "./ManagerStatus";
import Table from "./Table";

interface iViewAdminData {
  index: number;
  activate: boolean;
}

const Managers = () => {
  const { managers, loading, totalCount, totalPages } = useGetAllManagers();

  const [info, setInfo] = useState<iViewAdminData>({
    index: -1,
    activate: false,
  });

  const [
    openedManagerStatusModal,
    { open: openManagerStatusModal, close: closeManagerStatusModal },
  ] = useDisclosure(false);

  const [
    openedAddManagerModal,
    { open: openAddManagerModal, close: closeAddManagerModal },
  ] = useDisclosure(false);

  const handlePageClick = (event: any) => {
    const itemsPerPage = 10;
    const length = totalCount;
    const newOffset = (event.selected * itemsPerPage) % length;
  };

  const openStatusModal = (index: number, activate: boolean) => {
    setInfo({ index, activate });
    openManagerStatusModal();
  };

  return (
    <>
      {openedManagerStatusModal && (
        <ManagerStatus
          close={closeManagerStatusModal}
          id={managers[info.index].id}
          firstName={managers[info.index].firstName}
          lastName={managers[info.index].lastName}
          email={managers[info.index].email}
          activate={info.activate}
        />
      )}
      {openedAddManagerModal && (
        <AddManagerModal close={closeAddManagerModal} />
      )}

      <div className="w-full h-full pt-10 flex flex-col">
        <div className="flex h-[100px] justify-between items-center">
          <div className="flex flex-col gap-1">
            <h2 className="big-4 font-medium">
              Managers{" "}
              <span className="big-3 font-bold">({managers.length})</span>
            </h2>
            <p className="text-md text-monokai dark:text-white">
              Manage all your managers
            </p>
          </div>
          <div className="w-fit gap-3 flex items-center">
            <button
              onClick={() => useDashboardData.getState().refresh()}
              className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-neutral-light dark:bg-neutral-dark text-monokai dark:text-white px-5 py-2"
            >
              <MdRefresh size={"26px"} />
              Refresh
            </button>
            <button
              onClick={openAddManagerModal}
              className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-primary text-monokai dark:text-white px-5 py-2"
            >
              <IoAdd size={"26px"} />
              Add Manager
            </button>
          </div>
        </div>
        {!loading && (
          <div className="w-full max-h-[calc(100vh-245px)]">
            {managers.length > 0 && (
              <Table
                managers={managers}
                openStatus={openStatusModal}
                handlePageClick={handlePageClick}
                totalPages={totalPages}
              />
            )}
            {managers.length === 0 && (
              <div className="w-full h-full flex flex-col justify-center gap-5 items-center">
                <Image
                  src={Void}
                  alt="no admins"
                  className="size-[200px] object-cover"
                />
                <p className="large-1 text-neutral-dark dark:text-neutral-light">
                  No managers available
                </p>
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

export default Managers;
