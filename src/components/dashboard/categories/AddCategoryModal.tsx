import { Loader, Modal, Tabs, Textarea } from "@mantine/core";
import React, { FC, useState } from "react";
import { MdOutlineDone } from "react-icons/md";

import { HiOutlineGift } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";

import IconBrowser from "./IconBrowser";

import { HexColorPicker } from "react-colorful";

import { tCategory, getRandomIcon } from "./types";
import CategoryContainer from "./CategoryContainer";

import { renderToStaticMarkup } from "react-dom/server";
import { createCategory } from "@/src/services/categoryServices";
import { useCurrentAdminStore } from "@/src/stores/adminStore";
import toast from "react-hot-toast";
import { useDashboardData } from "@/src/stores/dashboardStore";
import { randomColorCode } from "@/src/functions/base";

const AddCategory: FC<{ opened: boolean; close: () => void }> = ({
  opened,
  close,
}) => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string | null>("details");

  const [contentFilled, setContentFilled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [category, setCategory] = useState<tCategory>({
    color: randomColorCode(),
    contents: [],
    id: "",
    name: "",
    icon: getRandomIcon(),
  });

  function addCategory() {
    if (title.length === 0 || body.length === 0) return;

    setCategory({
      ...category,
      contents: [
        ...category.contents,
        {
          title,
          body,
        },
      ],
    });
    setTitle("");
    setBody("");
    setContentFilled(false);
  }

  const create = async () => {
    if (loading) return;

    const Icon = category.icon;
    const svgString = renderToStaticMarkup(<Icon size={24} />);
    setLoading(true);

    try {
      await createCategory(useCurrentAdminStore.getState().token, {
        name: category.name,
        svgIcon: svgString,
        tagColor: category.color,
        content: category.contents,
      });
      toast.success("Category created successfully");
      setLoading(false);
      setTimeout(() => {
        close();
        useDashboardData.getState().refresh();
      }, 1000);
    } catch (e) {
      setLoading(false);
      toast.error("Failed to create category");
    }
  };

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
            <h1 className="big-2 font-[700] text-center">
              Create New Category
            </h1>

            <Tabs
              color="myColor"
              radius="xs"
              defaultValue="details"
              w={"100%"}
              value={activeTab}
              onChange={setActiveTab}
            >
              <Tabs.List grow justify="center">
                <Tabs.Tab value="details">Name</Tabs.Tab>
                <Tabs.Tab value="contents">Contents (Optional)</Tabs.Tab>
                <Tabs.Tab value="icon">Icon (Optional)</Tabs.Tab>
                <Tabs.Tab value="color">Color (Optional)</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="details">
                <div className="flex flex-col gap-5 py-4">
                  <div className="w-full flex flex-col gap-2 relative">
                    <label className="text-md text-neutral-dark dark:text-neutral-light">
                      Category Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g Food Prices"
                      className="w-full pl-10 pr-4"
                      value={category.name}
                      onChange={(e) => {
                        setCategory({ ...category, name: e.target.value });
                      }}
                    />
                    <HiOutlineGift
                      className="text-contrast-base absolute top-[38px] left-2"
                      size={"22px"}
                    />
                  </div>
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="contents">
                <div className="flex flex-col gap-5 py-4">
                  <div className="w-full flex flex-col gap-4">
                    {category.contents.length > 0 && (
                      <div className="flex flex-wrap gap-4 items-center">
                        {category.contents.map((ct, i) => {
                          return (
                            <div
                              key={i}
                              className="rounded bg-neutral-light dark:bg-neutral-dark text-monokai dark:text-white cursor-pointer gap-1 flex items-center relative"
                            >
                              <p
                                style={{
                                  wordWrap: "inherit",
                                  width: "inherit",
                                }}
                                className="pl-3 pr-7 py-2 line-clamp-1"
                              >
                                {ct.title}
                              </p>

                              <IoCloseOutline
                                size={"20px"}
                                className="absolute right-1 cursor-pointer"
                                onClick={() => {
                                  setCategory({
                                    ...category,
                                    contents: category.contents.filter(
                                      (_, index) => index !== i
                                    ),
                                  });
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}

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
                          setContentFilled(
                            e.target.value.length > 0 && body.length > 0
                          );
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
                          setContentFilled(
                            e.target.value.length > 0 && title.length > 0
                          );
                        }}
                      />
                    </div>

                    <button
                      onClick={addCategory}
                      className={`rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg ${
                        contentFilled
                          ? "bg-primary"
                          : "bg-neutral-light dark:bg-neutral-dark"
                      } text-monokai dark:text-white w-[180px] py-2 transition-colors duration-300 ease-out`}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="icon">
                <div className="py-4 flex justify-center">
                  <IconBrowser
                    setIcon={(type) =>
                      setCategory({
                        ...category,
                        icon: type,
                      })
                    }
                  />
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="color">
                <div className="py-4 flex justify-between items-center w-full">
                  <div className="w-[200px]">
                    <HexColorPicker
                      color={category.color}
                      onChange={(val) =>
                        setCategory({
                          ...category,
                          color: val,
                        })
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-6 w-[220px]">
                    <div className="flex flex-col gap-1">
                      <h2 className="large-1 font-semibold">Preview</h2>
                      <CategoryContainer
                        category={category}
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                </div>
              </Tabs.Panel>
            </Tabs>

            <button
              onClick={create}
              className={`rounded-[10px] ${
                activeTab !== "details" && "hidden"
              } font-medium flex items-center gap-2 justify-center text-lg ${
                category.name.length > 0
                  ? "bg-primary"
                  : "bg-neutral-light dark:bg-neutral-dark"
              } text-monokai dark:text-white w-[180px] py-2 transition-colors duration-300 ease-out`}
            >
              {loading ? <Loader color="white" /> : "Add Category"}
            </button>
          </div>
        </Modal.Content>
      </Modal.Body>
    </Modal.Root>
  );
};

export default AddCategory;
