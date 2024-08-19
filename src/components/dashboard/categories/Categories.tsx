"use client";

import React, { useEffect, useState } from "react";

import { useDashboardData } from "@/src/stores/dashboardStore";

import { IoAdd } from "react-icons/io5";
import Image from "next/image";
import Void from "@/public/Void.svg";
import { Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AddCategory from "./AddCategoryModal";

import { tServerCategory } from "./types";
import { ServerCategoryContainer } from "./CategoryContainer";
import ViewCategory from "./ViewCategory";
import toast, { Toaster } from "react-hot-toast";
import { useCategoryData } from "@/src/stores/categoryStore";
import { getAllCategories } from "@/src/services/categoryServices";
import { useCurrentAdminStore } from "@/src/stores/adminStore";
import { MdRefresh } from "react-icons/md";

const Categories = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [viewing, { open: openView, close: closeView }] = useDisclosure(false);
  const categories = useCategoryData((state) => state.categories);
  const [loading, setLoading] = useState<boolean>(true);
  const filter = useDashboardData((state) => state.searchFilter);
  const refresh = useDashboardData((state) => state.refreshPage);

  const init = async () => {
    setLoading(true);

    try {
      const data = await getAllCategories(
        useCurrentAdminStore.getState().token,
        filter
      );

      let mappedCategories: tServerCategory[] = data.data.map(
        (dt: any, i: number) => {
          return {
            id: dt.id,
            name: dt.name,
            totalItems: dt.totalItems,
            tagColor: dt.tagColor,
            svgIcon: dt.svgIcon,
            createdAt: dt.createdAt,
          };
        }
      );

      useCategoryData.setState({ categories: mappedCategories });

      // setTotalCount(Number.parseInt(data.count));
      // setTotalPages(Number.parseInt(data.pages));

      setLoading(false);
    } catch (e) {
      toast.error("An error occurred while fetching categories");
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, [filter, refresh]);

  const openViewModal = (index: number) => {
    useCategoryData.setState({ viewIndex: index });
    openView();
  };

  return (
    <>
      <Toaster />
      {opened && <AddCategory opened={opened} close={close} />}
      {viewing && <ViewCategory opened={viewing} close={closeView} />}
      <div className="w-full h-full pt-10 flex flex-col gap-10">
        <div className="w-full h-[100px] flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h1 className="big-4">Category Manager</h1>
            <p className="text-md text-monokai dark:text-white">
              Manage all your categories all in one spot
            </p>
          </div>
          <div className="flex w-fit gap-3 items-center">
            <button
              onClick={init}
              className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-neutral-light dark:bg-neutral-dark text-monokai dark:text-white px-5 py-2"
            >
              <MdRefresh size={"26px"} />
              Refresh
            </button>
            <button
              onClick={open}
              className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-primary text-monokai dark:text-white px-5 py-2 transition-colors duration-300 ease-out"
            >
              <IoAdd size={"26px"} />
              Create Category
            </button>
          </div>
        </div>
        {!loading && categories.length > 0 && (
          <div className="w-full h-[calc(100vh-290px)] overflow-y-scroll scrollbar-custom grid grid-cols-4 gap-6 px-4 py-[5px]">
            {categories.map((category, i) => {
              return (
                <ServerCategoryContainer
                  key={i}
                  category={category}
                  onClick={() => openViewModal(i)}
                />
              );
            })}
          </div>
        )}
        {!loading && categories.length === 0 && (
          <div className="w-full h-[calc(100vh-290px)] flex flex-col justify-center gap-5 items-center">
            <Image
              src={Void}
              alt="no categories"
              className="size-[200px] object-cover"
            />
            <p className="large-1 text-neutral-dark dark:text-neutral-light">
              No categories available
            </p>
          </div>
        )}
        {loading && (
          <div className="w-full h-full flex justify-center items-center">
            <Loader color="myColor.9" />
          </div>
        )}
      </div>
    </>
  );
};

export default Categories;
