import React, { useEffect, useState, FC } from "react";
import * as TbIcons from "react-icons/tb";
import { IconType } from "react-icons";
import { Loader } from "@mantine/core";

import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { isNumeric } from "@/src/functions/base";

interface Library {
  [key: string]: Record<string, IconType>;
}

const PAGE_SIZE = 36;

const IconBrowser: FC<{setIcon : (type : IconType) => void}> = ({setIcon}) => {
  const [libraries, setLibraries] = useState<Library>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedIconName, setSelectedIconName] = useState<string | null>(null);

  useEffect(() => {
    const loadLibraries = async (): Promise<void> => {
      const libraries: Library = {
        icons: TbIcons,
      };
      setLibraries(libraries);
      setLoading(false);
    };
    loadLibraries();
  }, []);

  const RenderIcons: FC<{
    library: Record<string, IconType>;
    page: number;
  }> = ({ library, page }): JSX.Element[] => {
    const iconsArray = Object.values(library);
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    return iconsArray.slice(startIndex, endIndex).map((Icon, index) => (

      <div
        key={index}
        onClick={() => {
          setSelectedIconName(Icon.name);
          setIcon(Icon);
        }}
        className={`cursor-pointer flex justify-center items-center ${selectedIconName === Icon.name && "bg-primary"} hover:bg-primary hover:dark:bg-primary p-1 rounded transition-all ease-in duration-200`}
      >
        <Icon size={"28px"} className="text-monokai dark:text-white" />
      </div>
    ));
  };

  const totalIcons = Object.values(libraries.icons || {}).length;
  const totalPages = Math.ceil(totalIcons / PAGE_SIZE);

  const [pageIndex, setPageIndex] = useState<string>("1");

  return (
    <div className="w-full">
      {loading ? (
        <div className="w-full h-20 flex justify-center items-center">
          <Loader color="myColor.9" />
        </div>
      ) : (
        <>
          {Object.entries(libraries).map(([libName, icons]) => (
            <div key={libName} className="grid grid-cols-6 gap-4">
              <RenderIcons library={icons} page={currentPage} />
            </div>
          ))}
          <div className="flex justify-center items-center gap-4 mt-10">
            <MdArrowBackIos
              onClick={() => {
                let prevPage = Math.max(currentPage - 1, 1);
                setPageIndex(prevPage.toString());
                setCurrentPage(prevPage);
              }}
              size={"24px"}
              className={`text-monokai dark:text-white ${
                currentPage === 1 && "hidden"
              } cursor-pointer`}
            />
            <div className="w-fit gap-4 flex items-center">
              <input
                type="text"
                value={pageIndex}
                className="w-12 px-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    let val = pageIndex;
                    if (val === "") {
                      val = "1";
                    }

                    if (isNumeric(val)) {
                      let parsedValue = parseInt(val);
                      parsedValue =
                        parsedValue < 1
                          ? 1
                          : parsedValue > totalPages
                          ? totalPages
                          : parsedValue;
                      setCurrentPage(parsedValue);
                      setPageIndex(parsedValue.toString());
                    }
                  }
                }}
                onChange={(e) => {
                  setPageIndex(e.target.value);
                }}
              />
              <p className="text-monokai dark:text-white select-none">{`of  ${totalPages}`}</p>
            </div>
            <MdArrowForwardIos
              onClick={() => {
                let nextPage = Math.min(currentPage + 1, totalPages);
                setPageIndex(nextPage.toString());
                setCurrentPage(nextPage);
              }}
              size={"24px"}
              className={`text-monokai dark:text-white ${
                currentPage === totalPages && "hidden"
              } cursor-pointer`}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default IconBrowser;
