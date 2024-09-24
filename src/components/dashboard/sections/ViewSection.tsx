"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Void from "@/public/Void.png";
import { Loader } from "@mantine/core";
import { MdRefresh } from "react-icons/md";
import { useGetInventoryById } from "@/src/hooks/inventoryHooks";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { useGetUniqueIcon } from "@/src/hooks/iconHooks";
import { useRouter } from "next/navigation";
import { SERVEXI_ITEM_ID } from "@/src/constants/constants";
import toast from "react-hot-toast";
import { IoAdd } from "react-icons/io5";
import { useGetSectionByID } from "@/src/hooks/sectionHooks";
import { RiSendPlaneFill } from "react-icons/ri";

const ViewSection = () => {
  const { data, success, loading, get: getSection } = useGetSectionByID();

  const { getIconForId } = useGetUniqueIcon();

  const router = useRouter();

  useEffect(() => {
    if (!checkItemIDExistsInLocalStorage()) {
      routeToPreviousPageAndShowToast();
      return;
    }

    getSection(window.localStorage.getItem(SERVEXI_ITEM_ID)!);
  }, []);

  const checkItemIDExistsInLocalStorage = () => {
    return window.localStorage.getItem(SERVEXI_ITEM_ID) !== null;
  };

  const routeToPreviousPageAndShowToast = () => {
    toast.error("Invalid Section");
    router.back();
  };

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
        <Loader color="myColor.9" />
      </div>
    );
  }

  if (!loading && data === null) {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex flex-col justify-center gap-5 items-center">
        <Image
          src={Void}
          alt="no sections"
          className="size-[200px] object-cover"
        />
        <p className="large-1 text-neutral-dark ">Invalid Section</p>
      </div>
    );
  }

  const Icon = getIconForId(data!.id);

  return (
    <>
      <div className="w-full h-full pt-5 flex flex-col">
        <div className="w-full flex justify-between items-center">
          <div className="w-fit gap-2 items-center flex">
            <h2 className="big-4 font-semibold text-monokai">{data!.name}</h2>
            <Icon size={"36px"} className="text-secondary" />
          </div>
          <div className="w-fit gap-3 flex items-center">
            <button
              title="Refresh the page"
              onClick={() => getSection(data!.id)}
              className="rounded-[10px] bg-neutral-light text-monokai p-2 shadow-custom-black"
            >
              <MdRefresh size={"26px"} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewSection;
