import React, { FC, useState } from "react";
import { Loader, Modal } from "@mantine/core";
import { useUpdateCategoryContent } from "@/src/hooks/categoryHooks";

interface iEditContent {
  opened: boolean;
  contentTitle: string;
  contentBody: string;
  contentId: string;
  close: () => void;
  onEdit: () => void;
}

const EditContent: FC<iEditContent> = ({
  opened,
  contentId,
  contentBody,
  contentTitle,
  close,
  onEdit,
}) => {
  const [title, setTitle] = useState<string>(contentTitle);
  const [content, setContent] = useState<string>(contentBody);
  const { loading, update } = useUpdateCategoryContent(true);

  return (
    <Modal.Root
      opened={opened}
      onClose={close}
      padding={"0px"}
      top={"0px"}
      size={"640px"}
      centered
    >
      <Modal.Overlay />
      <Modal.Body>
        <Modal.Content>
          <div className="w-full bg-white dark:bg-monokai shadow-custom-black dark:shadow-custom-white flex flex-col items-center px-10 py-8">
            <h2 className="text-monokai dark:text-white text-2xl font-semibold mb-8">
              Update Category Content
            </h2>

            <div className="flex flex-col items-start w-full gap-5 py-4">
              <div className=" w-full flex flex-col gap-2">
                <label className="text-md text-neutral-dark dark:text-neutral-light">
                  Content Title
                </label>
                <input
                  type="text"
                  placeholder="e.g Food Prices in Lagos"
                  className="w-full pl-4 pr-10"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="text-md text-neutral-dark dark:text-neutral-light">
                  Content Body
                </label>
                <textarea
                  placeholder="e.g Yams - ₦3500"
                  className="w-full h-[100px] px-4"
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
              </div>
            </div>

            <button
              onClick={() =>
                update(
                  {
                    contentId,
                    title,
                    content,
                  },
                  onEdit
                )
              }
              className="rounded-[10px] mt-10 font-medium flex items-center gap-2 justify-center text-lg bg-primary text-white px-5 py-2"
            >
              {loading ? <Loader color="white" /> : "Update"}
            </button>
          </div>
        </Modal.Content>
      </Modal.Body>
    </Modal.Root>
  );
};

export default EditContent;
