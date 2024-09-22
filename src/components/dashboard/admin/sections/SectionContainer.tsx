import React, { FC } from "react";

import { MdLocalOffer } from "react-icons/md";
import { tSection } from "@/src/stores/sectionStore";
const SectionContainer: FC<{ section: tSection; onSelect: () => void }> = ({
  section,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className="w-full hover:scale-105 scale-100 duration-300 ease-out transition-all cursor-pointer overflow-hidden h-40 bg-neutral-light rounded-lg shadow-custom flex flex-col p-2 relative"
    >
      <h2 className="text-xl font-bold text-monokai">{section.name}</h2>
      <p className="text-lg underline text-monokai">
        {section.inventories.length} items
      </p>
      <MdLocalOffer
        className="text-secondary absolute bottom-0 -left-0 -rotate-90"
        size={64}
      />
    </div>
  );
};

export default SectionContainer;
