import React, { FC, useEffect } from "react";

import { Loader, Modal } from "@mantine/core";
import { useLogout } from "@/src/hooks/authHooks";
import { useRouter } from "next/navigation";

const Logout: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { loading, success, logout } = useLogout();
  const router = useRouter();

  useEffect(() => {
    if (success) {
      router.replace("/auth/login");
      onClose();
    }
  }, [success]);

  return (
    <Modal.Root opened={true} onClose={onClose} padding={0} top={0} centered>
      <Modal.Overlay />

      <Modal.Body>
        <Modal.Content>
          <div className="w-full p-10 bg-white text-monokai flex flex-col gap-10 items-center">
            <div className="w-full">
              <h2 className="font-bold big-2">Leaving So Soon 😭</h2>
              <p className="text-neutral-dark text-lg">
                Are you sure you want to log out of your Servexi account?
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
                onClick={logout}
                className="w-[45%] bg-error text-white rounded py-2 font-semibold grid place-content-center"
              >
                {loading ? <Loader color="white.6" /> : "Yes, Logout"}
              </button>
            </div>
          </div>
        </Modal.Content>
      </Modal.Body>
    </Modal.Root>
  );
};

export default Logout;
