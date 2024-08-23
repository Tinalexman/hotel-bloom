import React, { FC, useState } from "react";
import { Loader, Tabs } from "@mantine/core";
import { HexColorPicker } from "react-colorful";
import { HiOutlineGift } from "react-icons/hi2";
import { ServerCategoryContainer } from "./CategoryContainer";
import IconBrowser from "./IconBrowser";
import { renderToStaticMarkup } from "react-dom/server";
import { addContent, updateContent } from "@/src/services/categoryServices";
import { useCurrentAdminStore } from "@/src/stores/adminStore";
import toast from "react-hot-toast";
import { useDashboardData } from "@/src/stores/dashboardStore";
import { tServerCategory } from "@/src/stores/categoryStore";
import {
  useAddCategoryContent,
  useUpdateCategory,
  useUpdateCategoryContent,
} from "@/src/hooks/categoryHooks";

interface iEditCategory {
  category: tServerCategory;
  onCancel: () => void;
  close: () => void;
}

interface iEditContent {
  contentTitle: string;
  contentBody: string;
  contentId: string;
  close: () => void;
  onCancel: () => void;
}

interface iAddContent {
  categoryId: string;
  close: () => void;
  onCancel: () => void;
}

export const EditCategoryData: FC<iEditCategory> = ({
  category,
  onCancel,
  close,
}) => {
  const [title, setTitle] = useState<string>(category.name);
  const [color, setColor] = useState<string>(category.tagColor);
  const [icon, setIcon] = useState<string>(category.svgIcon);
  const [activeTab, setActiveTab] = useState<string | null>("details");

  const { loading, update } = useUpdateCategory();

  return (
    <div className="w-full bg-white dark:bg-monokai shadow-custom-black dark:shadow-custom-white flex flex-col items-center px-10 py-8">
      <h2 className="text-monokai dark:text-white text-2xl font-semibold mb-8">
        Update Category
      </h2>

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
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <HiOutlineGift
                className="text-contrast-base absolute top-[38px] left-2"
                size={"22px"}
              />
            </div>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="icon">
          <div className="py-4 flex justify-center">
            <IconBrowser
              setIcon={(type) => {
                const Icon = type;
                const svgString = renderToStaticMarkup(<Icon size={24} />);
                setIcon(svgString);
              }}
            />
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="color">
          <div className="py-4 flex justify-between items-center w-full">
            <div className="w-[200px]">
              <HexColorPicker
                color={color}
                onChange={(val) => {
                  setColor(val);
                }}
              />
            </div>

            <div className="flex flex-col gap-6 w-[220px]">
              <div className="flex flex-col gap-1">
                <h2 className="large-1 font-semibold">Preview</h2>
                <ServerCategoryContainer
                  category={{
                    name: title,
                    svgIcon: icon,
                    tagColor: color,
                    createdAt: "",
                    id: "",
                    totalItems: category.totalItems,
                  }}
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </Tabs.Panel>
      </Tabs>

      <div className="w-full mt-10 flex justify-between items-center">
        <button
          onClick={() => {
            onCancel();
          }}
          className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-neutral-light dark:bg-neutral-dark text-monokai dark:text-white px-5 py-2"
        >
          Cancel
        </button>
        <button
          onClick={() =>
            update(
              {
                name: title,
                svgIcon: icon,
                tagColor: color,
                categoryId: category.id,
              },
              close
            )
          }
          className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-primary text-white px-5 py-2"
        >
          {loading ? <Loader color="white" /> : "Update"}
        </button>
      </div>
    </div>
  );
};

export const EditContentData: FC<iEditContent> = ({
  contentId,
  contentBody,
  contentTitle,
  onCancel,
  close,
}) => {
  const [title, setTitle] = useState<string>(contentTitle);
  const [content, setContent] = useState<string>(contentBody);

  const { loading, update } = useUpdateCategoryContent(false);

  return (
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

      <div className="w-full mt-10 flex justify-between items-center">
        <button
          onClick={() => {
            onCancel();
          }}
          className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-neutral-light dark:bg-neutral-dark text-monokai dark:text-white px-5 py-2"
        >
          Cancel
        </button>
        <button
          onClick={() =>
            update(
              {
                contentId,
                title,
                content,
              },
              close
            )
          }
          className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-primary text-white px-5 py-2"
        >
          {loading ? <Loader color="white" /> : "Update"}
        </button>
      </div>
    </div>
  );
};

export const AddContentData: FC<iAddContent> = ({
  categoryId,
  onCancel,
  close,
}) => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [filled, setFilled] = useState<boolean>(false);
  const { loading, add } = useAddCategoryContent(false);

  return (
    <div className="w-full bg-white dark:bg-monokai shadow-custom-black dark:shadow-custom-white flex flex-col items-center px-10 py-8">
      <h2 className="text-monokai dark:text-white text-2xl font-semibold mb-8">
        Add Category Content
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
      </div>

      <div className="w-full mt-10 flex justify-between items-center">
        <button
          onClick={() => {
            onCancel();
          }}
          className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-neutral-light dark:bg-neutral-dark text-monokai dark:text-white px-5 py-2"
        >
          Cancel
        </button>
        <button
          onClick={() =>
            add(
              {
                categoryId,
                content: [
                  {
                    title,
                    body,
                  },
                ],
              },
              close
            )
          }
          className={`rounded-[10px]  font-medium flex items-center gap-2 justify-center text-lg ${
            filled ? "bg-primary" : "bg-neutral-light dark:bg-neutral-dark"
          } text-monokai dark:text-white w-[180px] py-2 transition-colors duration-300 ease-out`}
        >
          {loading ? <Loader color="white" /> : "Add"}
        </button>
      </div>
    </div>
  );
};
