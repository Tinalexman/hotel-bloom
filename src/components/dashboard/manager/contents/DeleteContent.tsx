import { useDeleteCategoryContents } from "@/src/hooks/categoryHooks";
import { Loader, Modal } from "@mantine/core";
import { FC } from "react";

export interface iDeleteContent {
  opened: boolean;
  id: string;
  title: string;
  content: string;
  onDelete: () => void;
  close: () => void;
}

const DeleteContent: FC<iDeleteContent> = ({
  opened,
  id,
  title,
  content,
  onDelete,
  close,
}) => {
  const { loading, del } = useDeleteCategoryContents(true);

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
            <h2 className="text-monokai dark:text-white text-2xl font-semibold">
              Delete Content?
            </h2>
            <p className="text-md text-center dark:text-neutral-light text-neutral-dark">
              Are you sure you want to delete this category content?
            </p>
            <div className="flex w-full justify-center">
              <div className="max-w-[80%] px-3 py-2 bg-neutral-light dark:bg-neutral-dark rounded-[10px] mt-10">
                <p className="large-1 text-monokai dark:text-white font-semibold">
                  {title}
                </p>
                <p style={{ overflowWrap: "break-word" }}>{content}</p>
              </div>
            </div>

            <button
              onClick={() => {
                del([id], onDelete);
              }}
              className={`rounded-[10px] mt-10 font-medium flex items-center gap-2 justify-center text-lg bg-error text-white w-[180px] py-2 transition-colors duration-300 ease-out`}
            >
              {loading ? <Loader color="white" /> : "Delete"}
            </button>
          </div>
        </Modal.Content>
      </Modal.Body>
    </Modal.Root>
  );
};

export default DeleteContent;
