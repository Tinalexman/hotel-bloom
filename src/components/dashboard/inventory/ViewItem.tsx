"use client";

import React, { useState, useEffect } from "react";

import { IoAdd } from "react-icons/io5";
import Image from "next/image";
import Void from "@/public/Void.png";
import { Loader } from "@mantine/core";
import { MdRefresh } from "react-icons/md";
import { useDashboardData } from "@/src/stores/dashboardStore";
import { useGetAllInventory } from "@/src/hooks/inventoryHooks";

import { tInventory } from "@/src/stores/inventoryStore";

import { useGetUniqueIcon } from "@/src/hooks/iconHooks";
import { useRouter } from "next/navigation";
import { SERVEXI_INVENTORY_ITEM } from "@/src/constants/constants";
import toast from "react-hot-toast";

const ViewItem = () => {
  const [inventoryItem, setInventoryItem] = useState<tInventory | null>(null);
  const { data, loading, success } = useGetAllInventory();
  const { getIconForId } = useGetUniqueIcon();
  const router = useRouter();

  useEffect(() => {
    if (!checkItemIDExistsInLocalStorage()) {
      routeToPreviousPageAndShowToast();
      return;
    }

    if (!loading && success) {
      const itemID = window.localStorage.getItem(SERVEXI_INVENTORY_ITEM);
      const item = data.find((item) => {
        return item.id === itemID;
      });
      if (item !== undefined) {
        setInventoryItem(item);
      }
    }
  }, [loading, success]);

  const checkItemIDExistsInLocalStorage = () => {
    return window.localStorage.getItem(SERVEXI_INVENTORY_ITEM) !== null;
  };

  const routeToPreviousPageAndShowToast = () => {
    toast.error("Invalid Item");
    router.back();
  };

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
        <Loader color="myColor.9" />
      </div>
    );
  }

  if (!loading && inventoryItem === null) {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex flex-col justify-center gap-5 items-center">
        <Image
          src={Void}
          alt="no sections"
          className="size-[200px] object-cover"
        />
        <p className="large-1 text-neutral-dark ">Invalid Item</p>
      </div>
    );
  }

  const Icon = getIconForId(inventoryItem!.id);

  return (
    <div className="w-full h-full pt-5 flex flex-col">
      <div className="w-full flex justify-between items-center">
        <div className="w-fit gap-2 items-center flex">
          <h2 className="big-4 font-semibold text-monokai">
            {inventoryItem?.name}
          </h2>
          <Icon size={"36px"} className="text-secondary" />
        </div>
        <div className="w-fit gap-3 flex items-center">
          <button
            onClick={() => useDashboardData.getState().refresh()}
            className="rounded-[10px] bg-neutral-light text-monokai p-2 shadow-custom-black"
          >
            <MdRefresh size={"26px"} />
          </button>
          <button className="rounded-[10px] bg-secondary text-white p-2 shadow-custom-black">
            <IoAdd size={"26px"} />
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col mt-5">
        <p className="text-lg text-neutral-dark">
          Store Quantity:{" "}
          <span className="font-medium">{inventoryItem?.store_quantity}</span>
        </p>
        <p className="text-lg text-neutral-dark">
          Total quantity:{" "}
          <span className="font-medium">{inventoryItem?.total_quantity}</span>
        </p>

        <h2 className="big-1 font-semibold text-monokai mt-5">SECTIONS</h2>
      </div>
    </div>
  );
};

export default ViewItem;
