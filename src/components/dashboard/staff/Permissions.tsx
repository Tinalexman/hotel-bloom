import React, { FC, useState, useEffect } from "react";

import { Loader, Modal } from "@mantine/core";

import { iStaff } from "@/src/stores/userStore";

import CustomCheckBox from "@/src/components/reusable/CustomCheckbox";
import {
  useAddStaffPermission,
  useRemoveStaffPermission,
} from "@/src/hooks/staffHooks";
import { useGetAllSectionsForInventoryOrStaffPermission } from "@/src/hooks/sectionHooks";
import { IoMdClose } from "react-icons/io";

interface iSectionValue {
  id: string;
  name: string;
  update: boolean;
}

const allPermissions: string[] = [
  "View Log",
  "Create Section",
  "Manage Inventory",
  // "Manage Staff",
  "Manage Section Inventory",
];

const allPermissionsInLowerCase: string[] = [
  "view_log",
  "create_section",
  "manage_inventory",
  // "manage_staff",
  "manage_section_inventory",
];

const Permissions: FC<{ staff: iStaff; onClose: () => void }> = ({
  staff,
  onClose,
}) => {
  const [hasSections, setHasSections] = useState<boolean>(
    staff.permissions.managed_sections.length > 0
  );

  const [initialPermissions, setInitialPermissions] = useState<boolean[]>([
    staff.permissions.view_log,
    staff.permissions.create_section,
    staff.permissions.manage_inventory,
    // staff.permissions.manage_staff,
    hasSections,
  ]);

  const [sectionPermissions, setSectionPermissions] = useState<iSectionValue[]>(
    []
  );

  const [modifiedPermissionIndex, setModifiedPermissionIndex] =
    useState<number>(-1);
  const [modifiedSectionIndex, setModifiedSectionIndex] = useState<number>(-1);

  const {
    data: sections,
    success: getSectionsSuccess,
    loading: loadingSections,
  } = useGetAllSectionsForInventoryOrStaffPermission("user", staff.id);

  useEffect(() => {
    if (getSectionsSuccess) {
      const newSections: iSectionValue[] = [];
      for (let i = 0; i < sections.length; i++) {
        const sectionIndex = staff.permissions.managed_sections.findIndex(
          (s) => s.section_name === sections[i].name
        );
        newSections.push({
          id: sections[i].id,
          name: sections[i].name,
          update: sectionIndex !== -1,
        });
      }
      setSectionPermissions(newSections);
    }
  }, [getSectionsSuccess]);

  const {
    loading: loadingAddPermission,
    success: addPermissionSuccess,
    add,
  } = useAddStaffPermission();
  const {
    loading: loadingRemovePermission,
    success: removePermissionSuccess,
    remove,
  } = useRemoveStaffPermission(staff.id);

  useEffect(() => {
    if (!loadingRemovePermission && removePermissionSuccess) {
      if (modifiedPermissionIndex !== -1) {
        updatePermissionsArray(false);
      } else if (modifiedSectionIndex !== -1) {
        updateManagedSectionsArray(false);
      }
      setModifiedPermissionIndex(-1);
    }
  }, [loadingRemovePermission, removePermissionSuccess]);

  useEffect(() => {
    if (!loadingAddPermission && addPermissionSuccess) {
      if (modifiedPermissionIndex !== -1) {
        updatePermissionsArray(true);
      } else if (modifiedSectionIndex !== -1) {
        updateManagedSectionsArray(true);
      }

      setModifiedPermissionIndex(-1);
    }
  }, [loadingAddPermission, addPermissionSuccess]);

  const updatePermissionsArray = (value: boolean) => {
    const newPermissions = [...initialPermissions];
    newPermissions[modifiedPermissionIndex] = value;
    setInitialPermissions(newPermissions);
  };

  const updateManagedSectionsArray = (value: boolean) => {
    const newManagedSections = [...sectionPermissions];
    const sectionPermissionToBeUpdated =
      newManagedSections[modifiedSectionIndex];
    newManagedSections[modifiedSectionIndex] = {
      ...sectionPermissionToBeUpdated,
      update: value,
    };
    setSectionPermissions(newManagedSections);
  };

  const toggleManagedSectionsVisibility = () => {
    const newPermissions = [...initialPermissions];
    newPermissions[initialPermissions.length - 1] = !hasSections;
    setInitialPermissions(newPermissions);
    setHasSections(!hasSections);
  };

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
          <div className="w-full h-full p-6 bg-white text-monokai flex flex-col gap-5 items-center overflow-y-auto scrollbar-custom">
            <div className="w-full flex justify-between items-center">
              <div className="w-fit flex flex-col ">
                <h2 className="font-bold big-2">Staff Permissions</h2>
                <p className="text-neutral-dark text-lg">
                  View and update the permissions of{" "}
                  <span className="font-semibold">{staff.username}</span>
                </p>
              </div>
              {loadingAddPermission ||
              loadingRemovePermission ||
              loadingSections ? (
                <Loader color="myColor.6" />
              ) : (
                <IoMdClose
                  className="cursor-pointer text-monokai"
                  size={"26px"}
                  onClick={onClose}
                />
              )}
            </div>
            <div className="w-full flex flex-col gap-5">
              <table>
                <thead className="w-full">
                  <tr className="w-full">
                    <th>PERMISSIONS</th>
                    <th>ALLOWED</th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {allPermissions.map((p, i) => (
                    <tr key={i} className="w-full">
                      <td className="w-full">{p}</td>
                      <td>
                        <CustomCheckBox
                          value={initialPermissions[i]}
                          onChange={() => {
                            if (loadingAddPermission || loadingRemovePermission)
                              return;

                            if (i === initialPermissions.length - 1) {
                              toggleManagedSectionsVisibility();
                              return;
                            }

                            setModifiedPermissionIndex(i);
                            if (initialPermissions[i]) {
                              remove(allPermissionsInLowerCase[i]);
                            } else {
                              add({
                                user: staff.id,
                                permission: [allPermissions[i]],
                              });
                            }
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {hasSections && sectionPermissions.length > 0 && (
                <table>
                  <thead className="w-full">
                    <tr className="w-full">
                      <th>SECTIONS</th>
                      <th>UPDATE</th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {sections.map((s, i) => (
                      <tr key={i} className="w-full">
                        <td className="w-full">{s.name}</td>
                        <td>
                          <CustomCheckBox
                            value={sectionPermissions[i].update}
                            onChange={() => {
                              setModifiedSectionIndex(i);
                              if (sectionPermissions[i].update) {
                                remove(
                                  allPermissionsInLowerCase[
                                    allPermissionsInLowerCase.length - 1
                                  ],
                                  s.id
                                );
                              } else {
                                add({
                                  user: staff.id,
                                  permission: [
                                    allPermissions[allPermissions.length - 1],
                                  ],
                                  section: s.id,
                                  update_access: true,
                                });
                              }
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </Modal.Content>
      </Modal.Body>
    </Modal.Root>
  );
};

export default Permissions;
