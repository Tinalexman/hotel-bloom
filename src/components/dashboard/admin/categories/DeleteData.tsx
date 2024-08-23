import { Loader } from "@mantine/core";
import { FC } from "react";
import { tServerCategory } from "@/src/stores/categoryStore";
import { ServerCategoryContainer } from "./CategoryContainer";

export interface iDeleteCategory {
  category: tServerCategory;
  loading: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

export interface iDeleteContent {
  title: string;
  content: string;
  loading: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

export const DeleteCategoryData: FC<iDeleteCategory> = ({
  category,
  loading,
  onCancel,
  onDelete,
}) => {
  return (
    <div className="w-full bg-white dark:bg-monokai shadow-custom-black dark:shadow-custom-white flex flex-col items-center px-10 py-8">
      <h2 className="text-monokai dark:text-white text-2xl font-semibold">
        Delete Category?
      </h2>
      <p className="text-md text-center dark:text-neutral-light text-neutral-dark mb-10">
        Are you sure you want to delete this category?
      </p>

      <ServerCategoryContainer category={category} onClick={() => {}} />
      {category.totalItems > 0 && (
        <div className="w-full flex justify-center items-center">
          <p className="text-monokai dark:text-white large-1 mt-5">
            This category has{" "}
            <span className="font-semibold">
              {category.totalItems} content{category.totalItems > 1 ? "s" : ""}
            </span>
            . Deleting this category will also delete all of its contents. Are
            you sure you want to delete this category?
          </p>
        </div>
      )}

      <div className="w-full mt-10 flex justify-between items-center">
        <button
          onClick={onCancel}
          className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-neutral-light dark:bg-neutral-dark text-monokai dark:text-white px-5 py-2"
        >
          Cancel
        </button>
        <button
          onClick={onDelete}
          className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-error text-white px-5 py-2"
        >
          {loading ? <Loader color="white" /> : "Delete"}
        </button>
      </div>
    </div>
  );
};

export const DeleteContentData: FC<iDeleteContent> = ({
  title,
  content,
  loading,
  onCancel,
  onDelete,
}) => {
  return (
    <div className="w-full bg-white dark:bg-monokai shadow-custom-black dark:shadow-custom-white flex flex-col items-center px-10 py-8">
      <h2 className="text-monokai dark:text-white text-2xl font-semibold">
        Delete Content?
      </h2>
      <p className="text-md text-center dark:text-neutral-light text-neutral-dark">
        Are you sure you want to delete this category content?
      </p>
      <div className="flex w-full justify-center">
        <div className="px-3 py-2 bg-neutral-light dark:bg-neutral-dark rounded-[10px] mt-10">
          <p className="large-1 text-monokai dark:text-white font-semibold">
            {title}
          </p>
          <p style={{ overflowWrap: "break-word" }}>{content}</p>
        </div>
      </div>

      <div className="w-full mt-10 flex justify-between items-center">
        <button
          onClick={onCancel}
          className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-neutral-light dark:bg-neutral-dark text-monokai dark:text-white px-5 py-2"
        >
          Cancel
        </button>
        <button
          onClick={onDelete}
          className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-error text-white px-5 py-2"
        >
          {loading ? <Loader color="white" /> : "Delete"}
        </button>
      </div>
    </div>
  );
};
