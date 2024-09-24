import React, { FC, useEffect } from "react";

import { Modal, Loader } from "@mantine/core";
import { useGetUniqueIcon } from "@/src/hooks/iconHooks";
import { useDeleteSectionInventory } from "@/src/hooks/sectionHooks";
import { IoMdClose } from "react-icons/io";

const DeleteSectionInventory: FC<{
  id: string;
  name: string;
  onCancel: () => void;
  onClose: () => void;
}> = ({ id, name, onCancel, onClose }) => {
  const { loading, success, del } = useDeleteSectionInventory(id);

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
          <div className="w-full h-fit bg-white shadow-custom-black flex flex-col p-6 gap-4">
            <div className="w-full flex items-center justify-between">
              <div className="w-fit gap-2 items-center flex">
                <h2 className="big-2 font-semibold text-monokai">{name}</h2>
              </div>
              <IoMdClose
                className="cursor-pointer text-monokai"
                size={"26px"}
                onClick={onCancel}
              />
            </div>
            <p className="text-neutral-dark text-lg">
              Are you sure you want to delete this item? This process cannot be
              reversed.
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

export default DeleteSectionInventory;
