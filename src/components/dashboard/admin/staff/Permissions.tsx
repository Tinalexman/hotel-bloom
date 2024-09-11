import React, { FC, useState } from "react";

import { Loader, Modal } from "@mantine/core";

import { Formik, Form } from "formik";
import { FaPerson } from "react-icons/fa6";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { iStaff } from "@/src/stores/userStore";

interface iSectionValue {
  name: string;
  view: boolean;
  update: boolean;
}

const Permissions: FC<{ staff: iStaff; onClose: () => void }> = ({
  staff,
  onClose,
}) => {
  const [initialPermissions, setInitialPermissions] = useState<boolean[]>([
    staff.permissions.view_log,
    staff.permissions.create_section,
    staff.permissions.manage_inventory,
    staff.permissions.manage_staff,
  ]);

  const [sectionPermissions, setSectionPermissions] = useState<iSectionValue[]>(
    Array(staff.permissions.managed_sections.length).map((s) => ({
      name: staff.permissions.managed_sections[s].section_name,
      view: staff.permissions.managed_sections[s].view_access,
      update: staff.permissions.managed_sections[s].update_access,
    }))
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
                    <th>Allowed</th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {[
                    "View Log",
                    "Create Section",
                    "Manage Inventory",
                    "Manage Section Inventory",
                  ].map((p, i) => (
                    <tr key={i} className="w-full">
                      <td className="w-full">{p}</td>
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
              {sectionPermissions.length > 0 && (
                <table>
                  <thead className="w-full">
                    <tr className="w-full">
                      <th>SECTIONS</th>
                      <th className="px-5">View</th>
                      <th className="px-5">Update</th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {sectionPermissions.map((s, i) => (
                      <tr key={i} className="w-full">
                        <td className="w-full">{s.name}</td>
                        <td className="px-5">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            checked={sectionPermissions[i].view}
                            onChange={(e) => {
                              // const newPermissions = [...initialPermissions];
                              // newPermissions[i] = e.target.checked;
                              // setInitialPermissions(newPermissions);
                            }}
                          />
                        </td>
                        <td className="px-5">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            checked={sectionPermissions[i].update}
                            onChange={(e) => {
                              // const newPermissions = [...initialPermissions];
                              // newPermissions[i] = e.target.checked;
                              // setInitialPermissions(newPermissions);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <button
              type="submit"
              className={` bg-secondary rounded mt-2 w-[50%] h-12 text-white font-semibold text-[16px] leading-[24px] md:leading-[25.6px] items-center flex justify-center`}
            >
              Update Permissions
            </button>
          </div>
        </Modal.Content>
      </Modal.Body>
    </Modal.Root>
  );
};

export default Permissions;
