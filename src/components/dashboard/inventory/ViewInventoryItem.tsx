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
import TopupInventoryItem from "./TopupInventoryItem";
import DeleteInventoryItem from "./DeleteInventoryItem";
import { IoAdd } from "react-icons/io5";
import AddSectionInventory from "./AddSectionInventory";
import DeleteSectionInventory from "./DeleteSectionInventory";
import EditSectionInventory from "./EditSectionInventory";

const ViewInventoryItem = () => {
  const {
    data: inventory,
    loading: loadingInventory,
    get: getInventory,
  } = useGetInventoryById();

  const { getIconForId } = useGetUniqueIcon();
  const [topUpInventoryItem, setTopUpInventoryItem] = useState<boolean>(false);
  const [deleteInventoryItem, setDeleteInventoryItem] =
    useState<boolean>(false);
  const [addSectionInventory, setAddSectionInventory] =
    useState<boolean>(false);
  const [editSelectedInventoryItem, setEditSelectedInventoryItem] =
    useState<boolean>(false);
  const [deleteSelectedInventoryItem, setDeleteSelectedInventoryItem] =
    useState<boolean>(false);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  } | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!checkItemIDExistsInLocalStorage()) {
      routeToPreviousPageAndShowToast();
      return;
    }

    getInventory(window.localStorage.getItem(SERVEXI_ITEM_ID)!);
  }, []);

  const checkItemIDExistsInLocalStorage = () => {
    return window.localStorage.getItem(SERVEXI_ITEM_ID) !== null;
  };

  const routeToPreviousPageAndShowToast = () => {
    toast.error("Invalid Item");
    router.back();
  };

  if (loadingInventory) {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
        <Loader color="myColor.9" />
      </div>
    );
  }

  if (!loadingInventory && inventory === null) {
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

  const Icon = getIconForId(inventory!.id);

  return (
    <>
      {topUpInventoryItem && (
        <TopupInventoryItem
          item={inventory!}
          onCancel={() => setTopUpInventoryItem(false)}
          onClose={() => {
            setTopUpInventoryItem(false);
            getInventory(inventory!.id);
          }}
        />
      )}
      {deleteInventoryItem && (
        <DeleteInventoryItem
          item={inventory!}
          onClose={() => {
            setDeleteInventoryItem(false);
            router.back();
          }}
          onCancel={() => setDeleteInventoryItem(false)}
        />
      )}
      {addSectionInventory && (
        <AddSectionInventory
          id={inventory!.id}
          onCancel={() => setAddSectionInventory(false)}
          onClose={() => {
            setAddSectionInventory(false);
            getInventory(inventory!.id);
          }}
        />
      )}
      {editSelectedInventoryItem && selectedInventoryItem && (
        <EditSectionInventory
          section={{ ...selectedInventoryItem! }}
          onCancel={() => setEditSelectedInventoryItem(false)}
          onClose={() => {
            setEditSelectedInventoryItem(false);
            getInventory(inventory!.id);
          }}
        />
      )}
      {deleteSelectedInventoryItem && selectedInventoryItem && (
        <DeleteSectionInventory
          id={selectedInventoryItem!.id}
          name={selectedInventoryItem!.name}
          onCancel={() => setDeleteSelectedInventoryItem(false)}
          onClose={() => {
            setDeleteSelectedInventoryItem(false);
            getInventory(inventory!.id);
          }}
        />
      )}

      <div className="w-full h-full pt-5 flex flex-col">
        <div className="w-full flex justify-between items-center">
          <div className="w-fit gap-2 items-center flex">
            <h2 className="big-4 font-semibold text-monokai">
              {inventory!.name}
            </h2>
            <Icon size={"36px"} className="text-secondary" />
          </div>
          <div className="w-fit gap-3 flex items-center">
            <button
              title="Refresh the page"
              onClick={() => getInventory(inventory!.id)}
              className="rounded-[10px] bg-neutral-light text-monokai p-2 shadow-custom-black"
            >
              <MdRefresh size={"26px"} />
            </button>
            <button
              title="Top up this inventory item"
              onClick={() => setTopUpInventoryItem(true)}
              className="rounded-[10px] bg-secondary text-white p-2 shadow-custom-black"
            >
              <MdEdit size={"26px"} />
            </button>
            <button
              title="Delete this inventory item"
              onClick={() => setDeleteInventoryItem(true)}
              className="rounded-[10px] bg-error text-white p-2 shadow-custom-black"
            >
              <RiDeleteBinFill size={"26px"} />
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col mt-5">
          <p className="text-lg text-neutral-dark">
            Store Quantity:{" "}
            <span className="font-medium">{inventory!.store_quantity}</span>
          </p>
          <p className="text-lg text-neutral-dark">
            Total quantity:{" "}
            <span className="font-medium">{inventory!.total_quantity}</span>
          </p>

          <div className="w-full items-center justify-between flex">
            <h2 className="big-1 font-semibold text-monokai mt-5">SECTIONS</h2>
            <button
              title="Add new section inventory"
              onClick={() => setAddSectionInventory(true)}
              className="rounded-[10px] bg-secondary text-white p-2 shadow-custom-black"
            >
              <IoAdd size={"26px"} />
            </button>
          </div>

          {inventory!.sections.length === 0 && (
            <div className="w-full h-[calc(100vh-100px)] flex flex-col justify-center gap-5 items-center ">
              <Image
                src={Void}
                alt="no sections"
                className="size-[200px] object-cover"
              />
              <p className="large-1 text-neutral-dark ">
                No Section Inventory Created
              </p>
            </div>
          )}
          {inventory!.sections.length > 0 && (
            <table className="w-full mt-2">
              <thead>
                <tr className="bg-neutral-light">
                  <th className="pl-4">S/N</th>
                  <th>NAME</th>
                  <th>PRICE (₦)</th>
                  <th>QUANTITY</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {inventory!.sections.map((sc, i) => {
                  return (
                    <tr key={i}>
                      <td className="pl-4">
                        <h2 className="text-monokai font-medium">{i + 1}.</h2>
                      </td>
                      <td>
                        <h2 className="text-monokai font-medium">{sc.name}</h2>
                      </td>
                      <td className="pl-2">
                        <h2 className="text-monokai font-medium">
                          {Number.parseInt(sc!.price.toString()).toLocaleString(
                            "en-US"
                          )}
                        </h2>
                      </td>
                      <td className="pl-6">
                        <h2 className="text-monokai font-medium">
                          {sc!.quantity}
                        </h2>
                      </td>
                      <td className="flex gap-4 items-center w-fit">
                        <h2
                          onClick={() => {
                            setEditSelectedInventoryItem(true);
                            setSelectedInventoryItem(sc);
                          }}
                          className="text-secondary cursor-pointer underline font-semibold"
                        >
                          Edit
                        </h2>
                        <h2
                          onClick={() => {
                            setDeleteSelectedInventoryItem(true);
                            setSelectedInventoryItem(sc);
                          }}
                          className="text-error cursor-pointer underline font-semibold"
                        >
                          Delete
                        </h2>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewInventoryItem;
