import { Loader, Modal } from "@mantine/core";
import React, { FC, useState } from "react";

import { useAddCategoryContent } from "@/src/hooks/categoryHooks";
import { useCurrentManagerStore } from "@/src/stores/managerStore";

import { toast } from "react-hot-toast";

const AddContents: FC<{ opened: boolean; close: () => void, onAdd: () => void }> = ({
  opened,
  onAdd,
  close,
}) => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [filled, setFilled] = useState<boolean>(false);
  const { loading, add } = useAddCategoryContent(true);

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
          <div className="flex flex-col items-center gap-8 bg-white dark:bg-monokai px-10 py-8">
            <h1 className="big-2 font-[700] text-center">Create New Content</h1>

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
                  setFilled(e.target.value.length > 0 && body.length > 0);
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
                value={body}
                onChange={(e) => {
                  setBody(e.target.value);
                  setFilled(e.target.value.length > 0 && title.length > 0);
                }}
              />
            </div>

            <button
              onClick={() => {
                if (!filled) {
                  toast.error(
                    "Please provide the title and body for your content"
                  );
                } else {
                  add(
                    {
                      managerId: useCurrentManagerStore.getState().email,
                      content: [
                        {
                          title,
                          body,
                        },
                      ],
                    },
                    onAdd,
                  );
                }
              }}
              className={`rounded-[10px]  font-medium flex items-center gap-2 justify-center text-lg ${
                filled ? "bg-primary" : "bg-neutral-light dark:bg-neutral-dark"
              } text-monokai dark:text-white w-[180px] py-2 transition-colors duration-300 ease-out`}
            >
              {loading ? <Loader color="white" /> : "Add Content"}
            </button>
          </div>
        </Modal.Content>
      </Modal.Body>
    </Modal.Root>
  );
};

export default AddContents;
