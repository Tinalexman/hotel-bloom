import React, { useEffect, useState, useRef } from "react";

import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Performance = () => {
  const filterOptions: string[] = [
    "Today",
    "Yesterday",
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
    "Three Months",
    "Six Months",
    "This Year",
  ];

  const [percentage, setPercentage] = useState<number>(0);
  const performanceRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  const [perfomanceDropdown, setPerfomanceDropdown] = useState<boolean>(false);
  const [graphDropdown, setGraphDropdown] = useState<boolean>(false);

  const [performanceIndex, setPerformanceIndex] = useState<number>(0);
  const [graphIndex, setGraphIndex] = useState<number>(0);

  const handleOutsideClick = (
    event: MouseEvent,
    ref: React.RefObject<HTMLDivElement>,
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setter(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      handleOutsideClick(e, performanceRef, setPerfomanceDropdown);
      handleOutsideClick(e, graphRef, setGraphDropdown);
    });

    return () => {
      document.removeEventListener("mousedown", (e) => {
        handleOutsideClick(e, performanceRef, setPerfomanceDropdown);
        handleOutsideClick(e, graphRef, setGraphDropdown);
      });
    };
  }, []);

  function animatePercentage() {
    let counter = 0;
    const intervalId = setInterval(() => {
      counter += 1;
      if (counter <= 75) {
        setPercentage((prevPercentage) => Math.min(prevPercentage + 1, 75));
        counter = 0;
      } else {
        clearInterval(intervalId);
      }
    }, 20);
    return () => clearInterval(intervalId);
  }

  useEffect(() => {
    animatePercentage();
  }, []);

  return (
    <div className="w-[30%] p-5 h-full rounded-[20px] gap-8 bg-white dark:bg-monokai shadow-custom-black dark:shadow-custom-white flex flex-col items-center">
      <div className="flex flex-col gap-5 w-full items-start">
        <h1 className="text-monokai dark:text-white text-3xl">Perfomance</h1>
        <div className="flex justify-between items-center w-full">
          <div className="w-fit gap-3 flex items-center">
            <div className="size-4 rounded-md bg-primary" />
            <h2 className="text-monokai dark:text-white text-md">Progress</h2>
          </div>

          <div
            ref={performanceRef}
            onClick={() => setPerfomanceDropdown((prev) => !prev)}
            className="w-fit gap-3 flex items-center text-monokai dark:text-slate-300 cursor-pointer relative"
          >
            <BsFillCalendar2WeekFill size={"16px"} />
            <h2 className="text-md">{filterOptions[performanceIndex]}</h2>
            <IoIosArrowDown size={"16px"} />
            {/* <Dropdown
                  visible={perfomanceDropdown}
                  menus={filterOptions.map((op, i) => {
                    return {
                      name: op,
                      onClick: () => {
                        setPerformanceIndex(i);
                        setPerfomanceDropdown(false);
                      },
                    };
                  })}
                /> */}
          </div>
        </div>
      </div>

      <div style={{ width: 180, height: 180 }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          strokeWidth={10}
          styles={buildStyles({
            rotation: 0.5,
            strokeLinecap: "round",
            textSize: "16px",
            pathTransitionDuration: 0.5,
            pathColor: `#A419A4`,
            textColor: "#FFFFFF",
            trailColor: "#202020",
          })}
        />
      </div>

      <h2 className="text-md text-monokai dark:text-slate-300">
        15% more than last week
      </h2>
    </div>
  );
};

export default Performance;
