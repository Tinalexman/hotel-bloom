import React, { FC, useState } from "react";

import { Loader, Modal } from "@mantine/core";

import { Formik, Form } from "formik";
import { FaPerson } from "react-icons/fa6";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { tStaff } from "@/src/stores/staffStore";

const Permissions: FC<{ staff: tStaff; onClose: () => void }> = ({
  staff,
  onClose,
}) => {
  const [initialPermissions, setInitialPermissions] = useState<boolean[]>(
    staff.permissions.map((p, i) => p.value)
  );

  return (
    <Modal.Root
      opened={true}
      onClose={onClose}
      padding={0}
      top={0}
      size={"50%"}
      centered
    >
      <Modal.Overlay />

      <Modal.Body>
        <Modal.Content>
          <div className="w-full h-full p-10 bg-white text-monokai flex flex-col gap-5 items-center overflow-y-auto scrollbar-custom">
            <div className="w-full">
              <h2 className="font-bold big-2">Staff Permissions</h2>
              <p className="text-neutral-dark text-lg">
                View and update the permissions of your staff
              </p>
            </div>
            <div className="w-full flex flex-col gap-5">
              <table>
                <thead className="w-full">
                  <tr className="w-full">
                    <th>PERMISSIONS</th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {staff.permissions.map((p, i) => (
                    <tr key={i} className="w-full">
                      <td className="w-full">{p.name}</td>
                      <td>
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          checked={initialPermissions[i]}
                          onChange={(e) => {
                            const newPermissions = [...initialPermissions];
                            newPermissions[i] = e.target.checked;
                            setInitialPermissions(newPermissions);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table>
                <thead className="w-full">
                  <tr className="w-full">
                    <th>SECTIONS</th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {staff.permissions.map((p, i) => (
                    <tr key={i} className="w-full">
                      <td className="w-full">{p.name}</td>
                      <td>
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          checked={initialPermissions[i]}
                          onChange={(e) => {
                            const newPermissions = [...initialPermissions];
                            newPermissions[i] = e.target.checked;
                            setInitialPermissions(newPermissions);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Content>
      </Modal.Body>
    </Modal.Root>
  );
};

export default Permissions;
