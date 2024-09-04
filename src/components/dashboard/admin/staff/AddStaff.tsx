import React, { FC } from "react";

import { Modal } from "@mantine/core";

const AddStaff: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <Modal.Root opened={true} onClose={onClose} padding={0} top={0} centered>
      <Modal.Overlay />

      <Modal.Body>
        <Modal.Content>
          <div className="w-full bg-monokai flex flex-col items-center"></div>
        </Modal.Content>
      </Modal.Body>
    </Modal.Root>
  );
};

export default AddStaff;
