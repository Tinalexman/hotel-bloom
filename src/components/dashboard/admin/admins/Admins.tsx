"use client";

import { Loader } from "@mantine/core";
import React, { useState } from "react";

import { IoAdd } from "react-icons/io5";
import { MdRefresh } from "react-icons/md";

import Image from "next/image";
import Void from "@/public/Void.svg";
import { useDisclosure } from "@mantine/hooks";
import { useDashboardData } from "@/src/stores/dashboardStore";
import AddAdminModal from "./AddAdmin";
import { useGetAllAdmins } from "@/src/hooks/adminHooks";
import AdminStatus from "./AdminStatus";
import Table from "./Table";

interface iViewAdminData {
  index: number;
  activate: boolean;
}

const Admins = () => {
  const { admins, loading, totalCount, totalPages } = useGetAllAdmins();

  const [info, setInfo] = useState<iViewAdminData>({
    index: -1,
    activate: false,
  });

  const [
    openedAdminStatusModal,
    { open: openAdminStatusModal, close: closeAdminStatusModal },
  ] = useDisclosure(false);

  const [
    openedAddAdminModal,
    { open: openAddAdminModal, close: closeAddAdminModal },
  ] = useDisclosure(false);

  const handlePageClick = (event: any) => {
    const itemsPerPage = 10;
    const length = totalCount;
    const newOffset = (event.selected * itemsPerPage) % length;
  };

  const openStatusModal = (index: number, activate: boolean) => {
    setInfo({ index, activate });
    openAdminStatusModal();
  };

  return (
    <>
      {openedAdminStatusModal && (
        <AdminStatus
          close={closeAdminStatusModal}
          id={admins[info.index].id}
          firstName={admins[info.index].firstName}
          lastName={admins[info.index].lastName}
          email={admins[info.index].email}
          activate={info.activate}
        />
      )}
      {openedAddAdminModal && <AddAdminModal close={closeAddAdminModal} />}

      <div className="w-full h-full pt-10 flex flex-col">
        <div className="flex h-[100px] justify-between items-center">
          <div className="flex flex-col gap-1">
            <h2 className="big-4 font-medium">
              Administrators{" "}
              <span className="big-3 font-bold">({totalCount})</span>
            </h2>
            <p className="text-md text-monokai dark:text-white">
              Manage all your administrators
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
              onClick={openAddAdminModal}
              className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-primary text-monokai dark:text-white px-5 py-2"
            >
              <IoAdd size={"26px"} />
              Add Admin
            </button>
          </div>
        </div>
        {!loading && (
          <div className="w-full max-h-[calc(100vh-100px)]">
            {admins.length > 0 && (
              <Table
                admins={admins}
                openStatus={openStatusModal}
                handlePageClick={handlePageClick}
                totalPages={totalPages}
              />
            )}
            {admins.length === 0 && (
              <div className="w-full h-[calc(100vh-100px)] flex flex-col justify-center gap-5 items-center">
                <Image
                  src={Void}
                  alt="no admins"
                  className="size-[200px] object-cover"
                />
                <p className="large-1 text-neutral-dark dark:text-neutral-light">
                  No admins available
                </p>
              </div>
            )}
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

export default Admins;
