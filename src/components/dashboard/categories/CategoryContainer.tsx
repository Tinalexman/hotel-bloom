import React, { FC } from "react";
import { tCategory, tServerCategory } from "./types";
import { Tooltip } from "@mantine/core";

interface iContainerProp {
  category: tCategory;
  onClick: () => void;
}

interface iServerContainerProp {
  category: tServerCategory;
  onClick: () => void;
}

const CategoryContainer: FC<iContainerProp> = ({ category, onClick }) => {
  const Icon = category.icon;

  return (
    <div
      onClick={onClick}
      className="w-full h-[100px] flex justify-between items-center pl-8 pr-4 py-4 rounded-[10px] relative overflow-hidden shadow-custom-black dark:shadow-custom-white cursor-pointer transition-all duration-300 ease-out hover:scale-105 scale-100"
    >
      <div
        className="w-3 h-full absolute top-0 left-0"
        style={{
          background: category.color,
        }}
      />

      <div className="flex flex-col h-full">
        <h1 className="big-1 line-clamp-1">{category.name}</h1>
        <p className="text-md text-monokai dark:text-white underline">
          {category.contents.length} item
          {category.contents.length === 1 ? "" : "s"}
        </p>
      </div>
      <Icon size={"36px"} style={{ color: category.color }} />
    </div>
  );
};

export const ServerCategoryContainer: FC<iServerContainerProp> = ({
  category,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="w-full h-[100px] flex justify-between items-center pl-8 pr-4 py-4 rounded-[10px] relative overflow-hidden shadow-custom-black dark:shadow-custom-white cursor-pointer transition-all duration-300 ease-out hover:scale-105 scale-100"
    >
      <div
        className="w-3 h-full absolute top-0 left-0"
        style={{
          background: category.tagColor,
        }}
      />

      <div className="flex flex-col h-full">
        <Tooltip label={category.name}>
          <h1 className="big-1 line-clamp-1">{category.name}</h1>
        </Tooltip>
        <p className="text-md text-monokai dark:text-white underline">
          {category.totalItems} item
          {category.totalItems === 1 ? "" : "s"}
        </p>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: category.svgIcon }}
        style={{ color: category.tagColor, fontSize: "36px" }}
      />
    </div>
  );
};

export default CategoryContainer;
