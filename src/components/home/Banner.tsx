"use client";

import React, { useState, useRef } from "react";

import { TypeAnimation } from "react-type-animation";
import { IoArrowForward } from "react-icons/io5";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Navbar from "../reusable/Navbar";

const Banner = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const [swap, setSwap] = useState<boolean>(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (swap && latest < 0.98) {
      setSwap(false);
    } else if (!swap && latest > 0.98) {
      setSwap(true);
    }
  });

  return (
    <div
      ref={targetRef}
      className="w-full h-[100vh] bg-white relative"
    >
      <div className="fixed z-50">
        <Navbar />
      </div>
      <div className="bg-gradient-to-r md:bg-gradient-to-b from-black-70 to-transparent w-full h-full flex justify-between items-center px-40 md:px-5 md:py-10">
        <div className="flex flex-col w-[35rem] md:w-full md:h-full md:justify-between gap-8 md:pt-[20vh]">
          <div className="w-full space-y-3">
            <TypeAnimation
              sequence={[
                "Streamline Your Hospitality Business with Servexi.",
                1500,
                "Streamline Your Hospitality Business with the best tool.",
                3000,
              ]}
              preRenderFirstString
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-monokai big-6 font-bold"
            />

            <h2 className="text-subdisplay font-medium text-neutral-dark">
              Effortlessly manage staff, inventory, and operations in one intuitive platform
            </h2>
          </div>
          <button className="text-white text-button flex items-center justify-center gap-2 rounded bg-secondary px-2 py-3 w-44 md:w-full mt-2 md:mt-5">
            Get Started
            <motion.div
              initial={{
                x: "0%",
              }}
              animate={{
                x: "10%",
                transition: {
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  repeatType: "reverse",
                },
              }}
            >
              <IoArrowForward size={20} />
            </motion.div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
