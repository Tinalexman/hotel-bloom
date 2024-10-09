"use client";

import React, { useRef } from "react";

import { motion, useInView } from "framer-motion";
import { IoArrowForward } from "react-icons/io5";

const GetStarted = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: "some" });

  return (
    <div
      ref={ref}
      className="w-full h-[30rem] text-white bg-secondary flex flex-col gap-6 justify-center items-center relative"
    >
      <div className="text-sm font-bold bg-white-20 px-3 py-1 rounded-full w-fit z-10">
        BOOK SERVICE
      </div>
      <div className="flex flex-col items-center gap-3 z-10">
        <h1 className="text-extra text-center px-[15%]">
          Elevate Your Connectivity Today?
        </h1>
        <p className="text-body px-[15%] text-center">
          Schedule your telecom service with us now and enjoy superior internet,
          network aggregation, and voice communication solutions!
        </p>
      </div>
      <button className="text-secondary text-button flex items-center justify-center z-10 gap-2 rounded bg-white px-2 py-3 w-44  mt-2">
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
      <motion.div
        animate={{
          width: isInView ? "40%" : "0%",
          transition: { duration: 1, ease: "easeOut", delay: 0.3 },
        }}
        className="absolute top-[20%] right-0 h-[2px] bg-gradient-to-r from-transparent to-secondary-2"
      />
      <motion.div
        animate={{
          width: isInView ? "50%" : "0%",
          transition: { duration: 1, ease: "easeOut", delay: 0.5 },
        }}
        className="absolute top-[40%] right-0 h-[2px] bg-gradient-to-r from-transparent to-secondary-2"
      />
      <motion.div
        animate={{
          width: isInView ? "60%" : "0%",
          transition: { duration: 1, ease: "easeOut", delay: 0.8 },
        }}
        className="absolute top-[60%] right-0 h-[2px] bg-gradient-to-r from-transparent to-secondary-2"
      />
      <motion.div
        animate={{
          width: isInView ? "80%" : "0%",
          transition: { duration: 1, ease: "easeOut", delay: 1 },
        }}
        className="absolute top-[80%] right-0 h-[2px] bg-gradient-to-r from-transparent to-secondary-2"
      />
      <motion.div
        animate={{
          height: isInView ? "100%" : "0%",
          transition: { duration: 1, ease: "easeOut", delay: 0.3 },
        }}
        className="absolute top-0 right-[5%] w-[2px] bg-gradient-to-t from-secondary-3 to-secondary-2"
      />
      <motion.div
        animate={{
          height: isInView ? "90%" : "0%",
          transition: { duration: 1, ease: "easeOut", delay: 0.5 },
        }}
        className="absolute top-0 right-[15%] w-[2px] bg-gradient-to-t from-transparent to-secondary-2"
      />
      <motion.div
        animate={{
          height: isInView ? "80%" : "0%",
          transition: { duration: 1, ease: "easeOut", delay: 0.8 },
        }}
        className="absolute top-0 right-[25%] w-[2px] bg-gradient-to-t from-transparent to-secondary-2"
      />
      <motion.div
        animate={{
          height: isInView ? "70%" : "0%",
          transition: { duration: 1, ease: "easeOut", delay: 1 },
        }}
        className="absolute top-0 right-[35%] w-[2px] bg-gradient-to-t from-transparent to-secondary-2"
      />
    </div>
  );
};

export default GetStarted;
