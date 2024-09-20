import React, { FC } from "react";
import { tInventory } from "@/src/stores/inventoryStore";
import { IconType } from "react-icons";

const ItemContainer: FC<{
  item: tInventory;
  icon: IconType;
  onClick: () => void;
}> = ({ item, icon, onClick }) => {
  const Icon = icon;

  return (
    <div
      onClick={onClick}
      className="w-full bg-white h-[100px] flex justify-between items-center pl-8 pr-4 py-4 rounded-[10px] relative overflow-hidden shadow-custom-black cursor-pointer transition-all duration-300 ease-out hover:scale-105 scale-100"
    >
      <div className="w-3 h-full absolute top-0 left-0 bg-secondary" />

      <div className="flex flex-col h-full">
        <h1 className="big-1 line-clamp-1 font-semibold">{item.name}</h1>
        <p className="text-sm text-monokai">
          In Store: {item.store_quantity} item
          {item.store_quantity === 1 ? "" : "s"}
        </p>
        <p className="text-sm text-monokai">
          Total: {item.total_quantity} item
          {item.total_quantity === 1 ? "" : "s"}
        </p>
      </div>
      <Icon size={"36px"} className="text-secondary" />
    </div>
  );
};

export default ItemContainer;
