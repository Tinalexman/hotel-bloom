"use client";

import React, { useState } from "react";

import { IoAdd } from "react-icons/io5";
import Image from "next/image";
import Void from "@/public/Void.svg";
import { Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AddContents from "./AddContent";

import { useGetCategoryContents } from "@/src/hooks/categoryHooks";
import { MdRefresh } from "react-icons/md";
import { useCurrentManagerStore } from "@/src/stores/managerStore";
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
import { open } from "fs";
import EditContent from "./EditContent";
import DeleteContent from "./DeleteContent";

const Contents = () => {
  const [openedAdd, { open: openAdd, close: closeAdd }] = useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [index, setIndex] = useState<number>(-1);
  const email = useCurrentManagerStore((state) => state.email);
  const { loading, contents, refresh } = useGetCategoryContents(email, true);

  const openEditModal = (index: number) => {
    setIndex(index);
    openEdit();
  };

  const openDeleteModal = (index: number) => {
    setIndex(index);
    openDelete();
  };

  return (
    <>
      {openedAdd && (
        <AddContents
          opened={openedAdd}
          onAdd={() => {
            closeAdd();
            refresh();
          }}
          close={closeAdd}
        />
      )}

      {openedEdit && (
        <EditContent
          opened={openedEdit}
          contentTitle={contents[index].title}
          contentBody={contents[index].content}
          contentId={contents[index].id}
          onEdit={() => {
            closeEdit();
            refresh();
          }}
          close={closeEdit}
        />
      )}

      {openedDelete && (
        <DeleteContent
          opened={openedDelete}
          id={contents[index].id}
          title={contents[index].title}
          content={contents[index].content}
          onDelete={() => {
            closeDelete();
            refresh();
          }}
          close={closeDelete}
        />
      )}

      <div className="w-full h-full mt-5 flex flex-col gap-10">
        <div className="w-full h-[100px] flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h1 className="big-4">Contents Manager</h1>
            <p className="text-md text-monokai dark:text-white">
              Manage all your contents all in one spot
            </p>
          </div>
          <div className="flex w-fit gap-3 items-center">
            <button
              onClick={refresh}
              className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-neutral-light dark:bg-neutral-dark text-monokai dark:text-white px-5 py-2"
            >
              <MdRefresh size={"26px"} />
              Refresh
            </button>
            <button
              onClick={openAdd}
              className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-primary text-monokai dark:text-white px-5 py-2 transition-colors duration-300 ease-out"
            >
              <IoAdd size={"26px"} />
              Create Content
            </button>
          </div>
        </div>
        {!loading && contents.length > 0 && (
          <div className="w-full grid grid-cols-2 gap-6">
            {contents.map((value, i) => {
              return (
                <div
                  key={i}
                  className="px-3 py-2 bg-neutral-light dark:bg-neutral-dark rounded-[10px]"
                >
                  <p className="large-1 text-monokai dark:text-white font-semibold">
                    {value.title}
                  </p>
                  <p style={{ overflowWrap: "break-word" }}>{value.content}</p>
                  <div className="flex justify-end items-center gap-5 w-full py-2">
                    <FiEdit
                      onClick={() => openEditModal(i)}
                      size={"16px"}
                      className="cursor-pointer text-neutral-dark dark:text-neutral-light"
                    />
                    <AiTwotoneDelete
                      onClick={() => openDeleteModal(i)}
                      size={"16px"}
                      className="cursor-pointer text-neutral-dark dark:text-neutral-light"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {!loading && contents.length === 0 && (
          <div className="w-full h-[calc(100vh-100px)] flex flex-col justify-center gap-5 items-center">
            <Image
              src={Void}
              alt="no contents"
              className="size-[200px] object-cover"
            />
            <p className="large-1 text-neutral-dark dark:text-neutral-light">
              No contents available
            </p>
          </div>
        )}
        {loading && (
          <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
            <Loader color="myColor.9" />
          </div>
        )}
      </div>
    </>
  );
};

export default Contents;
