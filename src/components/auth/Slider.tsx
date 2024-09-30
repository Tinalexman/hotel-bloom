import { AnimatePresence, motion } from "framer-motion";
import { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";

import Bar1 from "@/public/Bar.jpg";
import Kitchen1 from "@/public/Kitchen.jpg";
import Financials1 from "@/public/Financials.jpg";

import Image from "next/image";

//Photo by <a href="/photographer/wladek-46398">wladek</a> on <a href="/">Freeimages.com</a>
//Photo by <a href="/photographer/a_kartha-39978">a_kartha</a> on <a href="/">Freeimages.com</a>
//Photo by <a href="/photographer/a_kartha-39978">a_kartha</a> on <a href="/">Freeimages.com</a>

const HotelSlider = () => {
  const slides: {
    image: string | StaticImageData;
    header: string;
    description: string;
  }[] = [
    {
      image: Bar1,
      header: "Efficient Bartending, Unleashed",
      description:
        "Experience our automated bar management system. Monitor all drinks served, manage inventory efficiently, and ensure guest satisfaction at every pour.",
    },
    {
      image: Kitchen1,
      header: "Kitchen Operations Redefined",
      description:
        "Our kitchen automation system streamlines meal preparation. Track ingredients, optimize cooking processes, and maintain high-quality standards effortlessly.",
    },
    {
      image: Financials1,
      header: "Transparent Financial Tracking",
      description:
        "Gain insights into your hotel's financial health like never before. Automate revenue tracking, expenses, and financial reporting for informed decision-making.",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex >= 2) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const [index, setIndex] = useState<number>(0);

  return (
    <div className="w-[50vw] h-full">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ x: "10%", opacity: 0 }}
          animate={{
            x: "0%",
            opacity: 1,
            transition: {
              ease: "anticipate",
              duration: 1.5,
            },
          }}
          exit={{
            x: "=10%",
            opacity: 0,
            transition: {
              ease: "linear",
            },
          }}
          className="relative w-[50vw]"
        >
          <Image
            src={slides[index].image}
            alt="hotel feature"
            className="w-[50vw] h-[100vh] object-cover absolute z-0 brightness-50"
          />

          <div className="z-10 absolute flex flex-col justify-end w-full h-[86vh] text-center px-[20%]">
            <motion.h2
              key={(index + 2) * 3}
              initial={{
                y: "-20%",
                opacity: 0,
              }}
              animate={{
                y: "0%",
                opacity: 1,
                transition: {
                  delay: 0.5,
                  duration: 1,
                  ease: "easeIn",
                  type: "spring",
                  bounce: 0.7,
                },
              }}
              className="text-[40px] leading-[60px] text-white font-semibold"
            >
              {slides[index].header}
            </motion.h2>
            <motion.p
              key={(index + 3) * 4}
              initial={{
                x: "-20%",
                opacity: 0,
              }}
              animate={{
                x: "0%",
                opacity: 1,
                transition: {
                  delay: 0.5,
                  duration: 1,
                  ease: "easeOut",
                  type: "spring",
                  bounce: 0.6,
                },
              }}
              className="text-white mt-5 med-3"
            >
              {slides[index].description}
            </motion.p>
            <div className="flex justify-center">
              <div className="flex justify-between items-center w-[65%] mt-12">
                {Array(3)
                  .fill(0)
                  .map((num, i) => {
                    return (
                      <div
                        key={i}
                        className={`${
                          i === index ? "bg-white" : "bg-white-20"
                        } w-[30%] h-0.5 rounded-full`}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HotelSlider;
