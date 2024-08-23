import { Modal, Loader } from "@mantine/core";
import React, { FC } from "react";

import Image from "next/image";
import { useUpdateManagerStatus } from "@/src/hooks/managerHooks";

const ManagerStatus: FC<{
  close: () => void;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  activate: boolean;
}> = ({ close, id, email, firstName, lastName, activate }) => {
  const { loading, update } = useUpdateManagerStatus();

  return (
    <Modal.Root
      opened={true}
      onClose={close}
      centered
      top={"0px"}
      padding={"0px"}
    >
      <Modal.Overlay />
      <Modal.Body>
        <Modal.Content>
          <div className="bg-white dark:bg-monokai flex flex-col gap-5 px-10 py-8 shadow-custom-black dark:shadow-custom-white">
            <h2 className="text-monokai dark:text-white text-2xl font-semibold">
              {activate ? "Enable Admin" : "Disable Admin"}
            </h2>

            <p className="text-neutral-dark dark:text-neutral-light">
              Are you sure you want to {activate ? "enable" : "disable"} this
              admin?
            </p>
            <div className="flex gap-2 w-fit items-center">
              <Image
                src={`https://gravatar.com/avatar/${id}?s=400&d=robohash&r=x`}
                alt="admin-picture"
                width={50}
                height={50}
                className={`object-cover size-10 rounded-[10px] dark:shadow-custom-white shadow-custom-black`}
              />
              <div className="flex flex-col gap-1">
                <h2 className="text-lg text-monokai dark:text-white font-medium">
                  {firstName} {lastName}
                </h2>
                <p className="text-sm text-neutral-dark dark:text-neutral-light">
                  {email}
                </p>
              </div>
            </div>

            <div className="w-full flex justify-between items-center">
              <button
                className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-neutral-light dark:bg-neutral-dark text-monokai dark:text-white px-5 py-2"
                onClick={close}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  update(
                    email,
                    !activate ? "disableManager" : "enableManager",
                    close
                  );
                }}
                className={`rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg ${
                  activate ? "bg-primary" : "bg-error"
                } text-monokai ${
                  activate ? "text-white" : "text-white"
                } dark:text-white px-5 py-2`}
              >
                {loading ? (
                  <Loader color="white" />
                ) : activate ? (
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
  );
};

export default ManagerStatus;
