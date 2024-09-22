import { Loader, Modal } from "@mantine/core";
import React, { FC, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";

import { IoAdd } from "react-icons/io5";
import {
  useUpdateInventory,
  useDeleteInventory,
} from "@/src/hooks/inventoryHooks";
import { tInventory } from "@/src/stores/inventoryStore";
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";

const ItemDetails: FC<{
  opened: boolean;
  item: tInventory;
  close: () => void;
}> = ({ item, opened, close }) => {
  const [deleteItem, showDeleteItem] = useState<boolean>(false);
  const [updateItem, showUpdateItem] = useState<boolean>(true);

  const {
    loading: loadingDelete,
    success: deleteSuccess,
    del,
  } = useDeleteInventory(item.id);

  return (
    <Modal.Root opened={opened} onClose={close} top={"0px"} centered>
      <Modal.Overlay />
      <Modal.Body>
        <Modal.Content>
          <div className="w-full h-fit bg-white shadow-custom-black flex flex-col px-10 py-8 gap-8">
            <div className="flex flex-col items-start w-full">
              <div className="flex w-full justify-between items-center">
                <h2 className="text-monokai text-2xl font-semibold">
                  {item.name}
                </h2>
                <div className="w-fit flex gap-8 items-center">
                  <FiEdit
                    onClick={() => {
                      showDeleteItem(false);
                      showUpdateItem(true);
                    }}
                    size={"24px"}
                    className={`cursor-pointer ${
                      updateItem && !deleteItem
                        ? "text-secondary"
                        : "text-neutral-dark"
                    }`}
                  />
                  <AiTwotoneDelete
                    onClick={() => {
                      showUpdateItem(false);
                      showDeleteItem(true);
                    }}
                    size={"26px"}
                    className={`cursor-pointer ${
                      !updateItem && deleteItem
                        ? "text-secondary"
                        : "text-neutral-dark"
                    }`}
                  />
                </div>
              </div>
              <p className="text-sm text-monokai">
                In Store: {item.store_quantity} item
                {item.store_quantity === 1 ? "" : "s"}
              </p>
              <p className="text-sm text-monokai">
                Total: {item.total_quantity} item
                {item.total_quantity === 1 ? "" : "s"}
              </p>
            </div>
            {updateItem && <EditItem item={item} onClose={close} />}
            {deleteItem && (
              <DeleteItem
                item={item}
                onClose={close}
                onCancel={() => {
                  showDeleteItem(false);
                  showUpdateItem(true);
                }}
              />
            )}
          </div>
        </Modal.Content>
      </Modal.Body>
    </Modal.Root>
  );
};

export default ItemDetails;
