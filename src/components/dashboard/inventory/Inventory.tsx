"use client";

import React, { useState } from "react";

import { IoAdd } from "react-icons/io5";
import Image from "next/image";
import Void from "@/public/Void.png";
import { Loader } from "@mantine/core";
import { MdRefresh } from "react-icons/md";
import { useDashboardData } from "@/src/stores/dashboardStore";
import AddInventoryItem from "./AddInventoryItem";
import { useGetAllInventory } from "@/src/hooks/inventoryHooks";

import { useRouter } from "next/navigation";
import { SERVEXI_INVENTORY_ITEM } from "@/src/constants/constants";
import { useGetUniqueIcon } from "@/src/hooks/iconHooks";

const Inventory = () => {
  const [addInventoryItem, shouldAddInventoryItem] = useState<boolean>(false);
  const { data: items, loading } = useGetAllInventory();
  const { getIconForId } = useGetUniqueIcon();
  const router = useRouter();

  return (
    <>
      {addInventoryItem && (
        <AddInventoryItem onClose={() => shouldAddInventoryItem(false)} />
      )}
      <div className="w-full h-full pt-5 flex flex-col">
        <div className="w-full h-[100px] flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="big-4 font-medium text-monokai">
              Inventory{" "}
              <span className="big-3 font-bold">({items.length})</span>
            </h2>
            <p className="text-lg text-neutral-dark">
              Manage the inventory of your organization
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
              onClick={() => shouldAddInventoryItem(true)}
              className="rounded-[10px] bg-secondary text-white p-2 shadow-custom-black"
            >
              <IoAdd size={"26px"} />
            </button>
          </div>
        </div>
        {!loading && items.length > 0 && (
          <table className="w-full mt-2">
            <thead>
              <tr className="bg-neutral-light">
                <th className="pl-4">S/N</th>
                <th>NAME</th>
                <th>TOTAL QUANTITY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => {
                return (
                  <tr key={i}>
                    <td className="pl-4">
                      <h2 className="text-monokai font-medium">{i + 1}.</h2>
                    </td>
                    <td>
                      <h2 className="text-monokai font-semibold">
                        {item.name}
                      </h2>
                    </td>
                    <td>
                      <h2 className="text-monokai font-medium">
                        {item.total_quantity}
                      </h2>
                    </td>

                    <td>
                      <h2
                        onClick={() => {
                          window.localStorage.setItem(
                            SERVEXI_INVENTORY_ITEM,
                            item.id
                          );
                          router.push("/dashboard/inventory/view-item");
                        }}
                        className="text-secondary underline font-semibold cursor-pointer"
                      >
                        View
                      </h2>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {!loading && items.length === 0 && (
          <div className="w-full h-[calc(100vh-100px)] flex flex-col justify-center gap-5 items-center">
            <Image
              src={Void}
              alt="no sections"
              className="size-[200px] object-cover"
            />
            <p className="large-1 text-neutral-dark ">No items available</p>
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

export default Inventory;
