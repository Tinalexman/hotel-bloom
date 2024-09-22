import { Loader, Modal } from "@mantine/core";
import React, { FC, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";

// import { tServerCategory } from "@/src/stores/categoryStore";

// import { AddContentData, EditCategoryData, EditContentData } from "./EditData";
// import { DeleteCategoryData, DeleteContentData } from "./DeleteData";
import { IoAdd } from "react-icons/io5";
import { tSection } from "@/src/stores/sectionStore";
// import {
//   useDeleteCategory,
//   useDeleteCategoryContents,
//   useGetCategoryContents,
// } from "@/src/hooks/categoryHooks";

const ViewSection: FC<{
  opened: boolean;
  section: tSection;
  close: () => void;
}> = ({ opened, close, section }) => {
  const [showDeleteCategory, setShowDeleteCategory] = useState<boolean>(false);
  const [showEditCategory, setShowEditCategory] = useState<boolean>(false);
  const [showDeleteContent, setShowDeleteContent] = useState<boolean>(false);
  const [showEditContent, setShowEditContent] = useState<boolean>(false);
  const [showAddContent, setShowAddContent] = useState<boolean>(false);

  return (
    <Modal.Root
      opened={opened}
      onClose={close}
      top={"0px"}
      size={"560px"}
      centered
    >
      <Modal.Overlay />
      <Modal.Body>
        <Modal.Content>
          {!showEditCategory &&
            !showDeleteCategory &&
            !showEditContent &&
            !showDeleteContent &&
            !showAddContent && (
              <div className="w-full bg-white shadow-custom-black flex flex-col px-10 py-8 gap-8">
                <div className="flex flex-col items-start w-full">
                  <div className="flex w-full justify-between items-center">
                    <div className="flex items-center gap-2 w-fit">
                      <h2 className="text-monokai text-2xl font-semibold">
                        {section.name}
                      </h2>
                    </div>
                    <div className="w-fit flex gap-8 items-center">
                      <IoAdd
                        size={"26px"}
                        onClick={() => {
                          setShowAddContent(true);
                        }}
                        className="cursor-pointer text-neutral-dark"
                      />
                      <FiEdit
                        onClick={() => {
                          setShowEditCategory(true);
                        }}
                        size={"24px"}
                        className="cursor-pointer text-neutral-dark "
                      />
                      <AiTwotoneDelete
                        onClick={() => {
                          setShowDeleteCategory(true);
                        }}
                        size={"26px"}
                        className="cursor-pointer text-neutral-dark "
                      />
                    </div>
                  </div>
                  <p className="text-sm text-neutral-dark">hellow</p>
                </div>
              </div>
            )}
        </Modal.Content>
      </Modal.Body>
    </Modal.Root>
  );
};

export default ViewSection;
