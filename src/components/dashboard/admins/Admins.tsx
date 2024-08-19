import {
  useAdminStatusStore,
  useCurrentAdminStore,
  useOtherAdminsStore,
} from "@/src/stores/adminStore";
import { Loader, Modal } from "@mantine/core";
import React, { useState, useEffect } from "react";

import { IoAdd } from "react-icons/io5";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdRefresh } from "react-icons/md";
import { tAdmin } from "@/src/stores/adminStore";

import Image from "next/image";
import Void from "@/public/Void.svg";
import { numberToFixedLengthHex, getRandomInt } from "@/src/functions/base";

import { MdOutlineDone, MdOutlineCancel } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";

import ReactPaginate from "react-paginate";

import { getAllAdmins, updateAdminStatus } from "@/src/services/adminServices";
import toast from "react-hot-toast";
import { useDashboardData } from "@/src/stores/dashboardStore";
import { convertDate } from "@/src/functions/dateFunctions";
import AddAdminModal from "./AddAdminModal";

const Admins = () => {
  const admins = useOtherAdminsStore((state) => state.admins);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
  const filter = useDashboardData((state) => state.searchFilter);
  const refreshContent = useDashboardData((state) => state.refresh);

  const [
    openedAdminStatusModal,
    { open: openAdminStatusModal, close: closeAdminStatusModal },
  ] = useDisclosure(false);

  const [
    openedAddAdminModal,
    { open: openAddAdminModal, close: closeAddAdminModal },
  ] = useDisclosure(false);

  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const init = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const data = await getAllAdmins(
        useCurrentAdminStore.getState().token,
        filter
      );

      let mappedAdmins: tAdmin[] = data.data.map((dt: any, i: number) => {
        return {
          id: dt.id,
          firstName: dt.firstName,
          lastName: dt.lastName,
          email: dt.email,
          active: dt.status === "active",
          createdAt: dt.createdAt,
          token: "",
        };
      });

      setTotalCount(Number.parseInt(data.count));
      setTotalPages(Number.parseInt(data.pages));
      useOtherAdminsStore.setState({ admins: mappedAdmins });

      setLoading(false);
    } catch (e) {
      toast.error("An error occurred while fetching admin data");
      setLoading(false);
    }
  };

  const handlePageClick = (event: any) => {
    const itemsPerPage = 10;
    const length = totalCount;
    const newOffset = (event.selected * itemsPerPage) % length;
  };

  const changeAdminStatus = async (
    email: string,
    operation: "enableAdmin" | "disableAdmin"
  ) => {
    if (loadingStatus) return;

    setLoadingStatus(true);
    let op = operation === "enableAdmin" ? "enabled" : "disabled";
    let op_ing = operation === "enableAdmin" ? "enabling" : "disabling";
    try {
      await updateAdminStatus(
        useCurrentAdminStore.getState().token,
        email,
        operation
      );
      toast.success(`Admin ${op} successfully`);
      setLoadingStatus(false);
      closeAdminStatusModal();
      init();
    } catch (e) {
      toast.error(`An error occurred while ${op_ing} the admin`);
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    init();
  }, [filter, refreshContent]);

  const openStatusModal = (index: number, activate: boolean) => {
    useAdminStatusStore.setState({ index: index, activate: activate });
    openAdminStatusModal();
  };

  return (
    <>
      {openedAdminStatusModal && (
        <Modal.Root
          opened={openedAdminStatusModal}
          onClose={closeAdminStatusModal}
          centered
          top={"0px"}
          padding={"0px"}
        >
          <Modal.Overlay />
          <Modal.Body>
            <Modal.Content>
              <div className="bg-white dark:bg-monokai flex flex-col gap-5 px-10 py-8 shadow-custom-black dark:shadow-custom-white">
                <h2 className="text-monokai dark:text-white text-2xl font-semibold">
                  {useAdminStatusStore.getState().activate
                    ? "Enable Admin"
                    : "Disable Admin"}
                </h2>

                <p className="text-neutral-dark dark:text-neutral-light">
                  Are you sure you want to{" "}
                  {useAdminStatusStore.getState().activate
                    ? "enable"
                    : "disable"}{" "}
                  this admin?
                </p>
                <div className="flex gap-2 w-fit items-center">
                  <Image
                    src={`https://gravatar.com/avatar/${
                      admins[useAdminStatusStore.getState().index].id
                    }?s=400&d=robohash&r=x`}
                    alt="admin-picture"
                    width={50}
                    height={50}
                    className={`object-cover size-10 rounded-[10px] dark:shadow-custom-white shadow-custom-black`}
                  />
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg text-monokai dark:text-white font-medium">
                      {admins[useAdminStatusStore.getState().index].firstName}{" "}
                      {admins[useAdminStatusStore.getState().index].lastName}
                    </h2>
                    <p className="text-sm text-neutral-dark dark:text-neutral-light">
                      {admins[useAdminStatusStore.getState().index].email}
                    </p>
                  </div>
                </div>

                <div className="w-full flex justify-between items-center">
                  <button
                    className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-neutral-light dark:bg-neutral-dark text-monokai dark:text-white px-5 py-2"
                    onClick={closeAdminStatusModal}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      changeAdminStatus(
                        admins[useAdminStatusStore.getState().index].email,
                        !useAdminStatusStore.getState().activate
                          ? "disableAdmin"
                          : "enableAdmin"
                      );
                    }}
                    className={`rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg ${
                      useAdminStatusStore.getState().activate
                        ? "bg-primary"
                        : "bg-error"
                    } text-monokai ${
                      useAdminStatusStore.getState().activate
                        ? "text-white"
                        : "text-white"
                    } dark:text-white px-5 py-2`}
                  >
                    {loadingStatus ? (
                      <Loader color="white" />
                    ) : useAdminStatusStore.getState().activate ? (
                      "Enable"
                    ) : (
                      "Disable"
                    )}
                  </button>
                </div>
              </div>
            </Modal.Content>
          </Modal.Body>
        </Modal.Root>
      )}
      {openedAddAdminModal && (
        <Modal.Root
          opened={openedAddAdminModal}
          onClose={closeAddAdminModal}
          centered
          top={"0px"}
          padding={"0px"}
        >
          <Modal.Overlay />
          <Modal.Body>
            <Modal.Content>
              <AddAdminModal close={closeAddAdminModal} />
            </Modal.Content>
          </Modal.Body>
        </Modal.Root>
      )}
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
              onClick={init}
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
          <div className="w-full max-h-[calc(100vh-245px)]">
            {admins.length > 0 && (
              <>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>NAME</th>
                      <th>STATUS</th>
                      <th>DATE JOINED</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin, i) => {
                      let hexCode = `#${numberToFixedLengthHex(
                        getRandomInt(0, 16777215)
                      )}`;
                      return (
                        <tr key={admin.id} className="">
                          <td>
                            <h2 className="text-lg text-monokai dark:text-white font-medium">
                              {i + 1}.
                            </h2>
                          </td>
                          <td className="">
                            <div className="flex gap-3 w-fit items-center">
                              <Image
                                src={`https://gravatar.com/avatar/${admin.id}?s=400&d=robohash&r=x`}
                                alt="admin-picture"
                                width={50}
                                height={50}
                                className={`object-cover size-10 rounded-[10px] bg-[${hexCode}] dark:shadow-custom-white shadow-custom-black`}
                              />
                              <div className="flex flex-col">
                                <h2 className="text-lg text-monokai dark:text-white font-medium">
                                  {admin.firstName} {admin.lastName}
                                </h2>
                                <p className="text-sm text-neutral-dark dark:text-neutral-light">
                                  {admin.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="">
                            <p
                              className={`${
                                admin.active ? "text-primary" : "text-error"
                              }`}
                            >
                              {admin.active ? "Active" : "Disabled"}
                            </p>
                          </td>
                          <td className="">{convertDate(admin.createdAt)}</td>
                          <td className="">
                            <div className="flex w-fit gap-5">
                              <div
                                onClick={() => {
                                  if (admin.active) {
                                    openStatusModal(i, false);
                                  }
                                }}
                                className={`flex ${
                                  admin.active
                                    ? "hover:bg-error-20 text-neutral-dark dark:text-neutral-light cursor-pointer"
                                    : "text-gray-500 cursor-not-allowed"
                                } py-1 px-2 rounded-[10px] w-fit gap-1 items-center transition-all duration-100 ease-out`}
                              >
                                <MdOutlineCancel />
                                Disable
                              </div>

                              <div
                                onClick={() => {
                                  if (!admin.active) {
                                    openStatusModal(i, true);
                                  }
                                }}
                                className={`flex ${
                                  !admin.active
                                    ? "hover:bg-primary-20 text-neutral-dark dark:text-neutral-light cursor-pointer"
                                    : "text-gray-500 cursor-not-allowed"
                                } py-1 px-2 rounded-[10px] w-fit gap-1 items-center transition-all duration-100 ease-out`}
                              >
                                <MdOutlineDone />
                                Enable
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="h-[45px] w-full flex justify-end items-end">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel={
                      <IoIosArrowForward
                        className="text-monokai dark:text-white"
                        size={"22px"}
                      />
                    }
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
                    previousLabel={
                      <IoIosArrowBack
                        className="text-monokai dark:text-white"
                        size={"22px"}
                      />
                    }
                    renderOnZeroPageCount={null}
                    className="flex gap-2 items-center w-fit"
                  />
                </div>
              </>
            )}
            {admins.length === 0 && (
              <div className="w-full h-full flex flex-col justify-center gap-5 items-center">
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
          <div className="w-full h-full flex justify-center items-center">
            <Loader color="myColor.9" />
          </div>
        )}
      </div>
    </>
  );
};

export default Admins;
