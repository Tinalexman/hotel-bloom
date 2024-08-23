import { Loader, Modal } from "@mantine/core";
import React, { FC, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";

import { tServerCategory } from "@/src/stores/categoryStore";

import { AddContentData, EditCategoryData, EditContentData } from "./EditData";
import { DeleteCategoryData, DeleteContentData } from "./DeleteData";
import { IoAdd } from "react-icons/io5";
import {
  useDeleteCategory,
  useDeleteCategoryContents,
  useGetCategoryContents,
} from "@/src/hooks/categoryHooks";

const ViewCategory: FC<{
  opened: boolean;
  category: tServerCategory;
  close: () => void;
}> = ({ opened, close, category }) => {
  const [showDeleteCategory, setShowDeleteCategory] = useState<boolean>(false);
  const [showEditCategory, setShowEditCategory] = useState<boolean>(false);
  const [showDeleteContent, setShowDeleteContent] = useState<boolean>(false);
  const [showEditContent, setShowEditContent] = useState<boolean>(false);
  const [showAddContent, setShowAddContent] = useState<boolean>(false);

  const {
    loading: loadingContents,
    contents,
    refresh,
  } = useGetCategoryContents(category.id, false);
  const { loading: loadingDeleteCategory, del: delCategory } =
    useDeleteCategory();
  const { loading: loadingDeleteCategoryContents, del: delContents } =
    useDeleteCategoryContents(false);

  const [index, setIndex] = useState<number>(-1);

  if (category === undefined) return <></>;

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
              <div className="w-full bg-white dark:bg-monokai shadow-custom-black dark:shadow-custom-white flex flex-col px-10 py-8 gap-8 relative">
                <div className="absolute flex flex-col items-start w-[calc(100%-80px)]">
                  <div className="flex w-full justify-between items-center">
                    <div className="flex items-center gap-2 w-fit">
                      <h2 className="text-monokai dark:text-white text-2xl font-semibold">
                        {category.name}
                      </h2>
                      <div
                        dangerouslySetInnerHTML={{ __html: category.svgIcon }}
                        style={{ color: category.tagColor, fontSize: "32px" }}
                      />
                    </div>
                    <div className="w-fit flex gap-8 items-center">
                      <IoAdd
                        size={"26px"}
                        onClick={() => {
                          setShowAddContent(true);
                        }}
                        className="cursor-pointer text-neutral-dark dark:text-neutral-light"
                      />
                      <FiEdit
                        onClick={() => {
                          setShowEditCategory(true);
                        }}
                        size={"24px"}
                        className="cursor-pointer text-neutral-dark dark:text-neutral-light"
                      />
                      <AiTwotoneDelete
                        onClick={() => {
                          setShowDeleteCategory(true);
                        }}
                        size={"26px"}
                        className="cursor-pointer text-neutral-dark dark:text-neutral-light"
                      />
                    </div>
                  </div>
                  <p className="text-sm underline dark:text-neutral-light text-neutral-dark">
                    {loadingContents ? category.totalItems : contents.length}{" "}
                    item
                    {loadingContents
                      ? category.totalItems !== 1 && "s"
                      : contents.length !== 1 && "s"}
                  </p>
                </div>

                {loadingContents && (
                  <div className="flex w-full h-40 justify-center items-center mt-20">
                    <Loader color="myColor.9" />
                  </div>
                )}
                {!loadingContents && (
                  <div className="flex flex-col max-h-[400px] scrollbar-custom overflow-y-scroll gap-5 mt-24">
                    {contents.map((value, index) => {
                      return (
                        <div
                          key={index}
                          className="px-3 py-2 bg-neutral-light dark:bg-neutral-dark rounded-[10px]"
                        >
                          <p className="large-1 text-monokai dark:text-white font-semibold">
                            {value.title}
                          </p>
                          <p>{value.content}</p>
                          <div className="flex justify-end items-center gap-5 w-full py-2">
                            <FiEdit
                              onClick={() => {
                                setIndex(index);
                                setShowEditContent(true);
                              }}
                              size={"16px"}
                              className="cursor-pointer text-neutral-dark dark:text-neutral-light"
                            />
                            <AiTwotoneDelete
                              onClick={() => {
                                setIndex(index);
                                setShowDeleteContent(true);
                              }}
                              size={"16px"}
                              className="cursor-pointer text-neutral-dark dark:text-neutral-light"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {!loadingContents && category.totalItems === 0 && (
                  <div className="flex w-full h-[200px] justify-center items-center">
                    <p className="text-monokai dark:text-white big-1 ">
                      No contents available
                    </p>
                  </div>
                )}
              </div>
            )}
          {showDeleteCategory && (
            <DeleteCategoryData
              category={category}
              loading={loadingDeleteCategory || loadingDeleteCategoryContents}
              onCancel={() => {
                setShowDeleteCategory(false);
              }}
              onDelete={() =>
                delCategory(category.id, [], () => {
                  setShowDeleteCategory(false);
                  refresh();
                })
              }
            />
          )}
          {showDeleteContent && (
            <DeleteContentData
              title={contents[index].title}
              content={contents[index].content}
              loading={loadingDeleteCategory || loadingDeleteCategoryContents}
              onCancel={() => setShowDeleteContent(false)}
              onDelete={() => {
                delContents([contents[index].id], () => {
                  setShowDeleteContent(false);
                  refresh();
                });
              }}
            />
          )}
          {showEditCategory && (
            <EditCategoryData
              category={category}
              onCancel={() => setShowEditCategory(false)}
              close={() => {
                setShowEditCategory(false);
                refresh();
              }}
            />
          )}
          {showEditContent && (
            <EditContentData
              contentId={contents[index].id}
              contentBody={contents[index].content}
              contentTitle={contents[index].title}
              onCancel={() => setShowEditContent(false)}
              close={() => {
                setShowEditContent(false);
                refresh();
              }}
            />
          )}
          {showAddContent && (
            <AddContentData
              categoryId={category.id}
              close={() => {
                setShowAddContent(false);
                refresh();
              }}
              onCancel={() => setShowAddContent(false)}
            />
          )}
        </Modal.Content>
      </Modal.Body>
    </Modal.Root>
  );
};

export default ViewCategory;
