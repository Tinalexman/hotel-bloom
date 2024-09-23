import React, { FC, useEffect } from "react";

import { Loader, Modal } from "@mantine/core";

import { useDeleteStaff } from "@/src/hooks/staffHooks";
import { iStaff } from "@/src/stores/userStore";

const DeleteStaff: FC<{ staff: iStaff; onClose: () => void }> = ({
  staff,
  onClose,
}) => {
  const { loading, success, del } = useDeleteStaff(staff.id);

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
          <div className="w-full p-6 bg-white text-monokai flex flex-col gap-10 items-center">
            <div className="w-full">
              <h2 className="font-bold big-2">Delete {staff.username}?</h2>
              <p className="text-neutral-dark text-lg">
                Note: This action cannot be reversed
              </p>
            </div>
            <div className="flex w-full items-center justify-between">
              <button
                onClick={onClose}
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

export default DeleteStaff;
