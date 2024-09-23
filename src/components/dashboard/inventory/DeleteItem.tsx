import React, { FC, useEffect } from "react";

import { Modal, Loader } from "@mantine/core";

import { useDeleteInventory } from "@/src/hooks/inventoryHooks";
import { tInventory } from "@/src/stores/inventoryStore";

const DeleteItem: FC<{
  item: tInventory;
  onCancel: () => void;
  onClose: () => void;
}> = ({ item, onCancel, onClose }) => {
  const { loading, success, del } = useDeleteInventory(item.id);

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success]);

  return (
    <Modal.Root opened={true} onClose={onClose} padding={0} top={0} centered>
      <Modal.Overlay />
      <Modal.Body>
        <Modal.Content>
          <div className="w-full flex flex-col gap-4 bg-white">
            <p className="text-neutral-dark text-lg">
              Are you sure you want to delete this item?
            </p>
            <div className="flex w-full items-center justify-between">
              <button
                onClick={onCancel}
                className="w-[45%] border border-monokai rounded py-2 text-monokai font-medium"
              >
                Cancel
              </button>
              <button
                onClick={del}
                className="w-[45%] bg-error text-white rounded py-2 font-semibold grid place-content-center"
              >
                {loading ? <Loader color="white.6" /> : "Yes, Delete"}
              </button>
            </div>
          </div>
        </Modal.Content>
      </Modal.Body>
    </Modal.Root>
  );
};

export default DeleteItem;
