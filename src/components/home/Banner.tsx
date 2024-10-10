"use client";

import React, { useState, useRef } from "react";

import { TypeAnimation } from "react-type-animation";
import { IoArrowForward } from "react-icons/io5";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Navbar from "../reusable/Navbar";
import Link from "next/link";

import Image from "next/image";
import DashboardImage from "@/public/servexi dashboard.png";

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
      className="w-full bg-background"
    >
      <div className="fixed bg-background top-0 z-[100] w-full">
        <Navbar />
      </div>
      <div className="w-full flex flex-col items-center lg:px-28 xs:px-0 xs:py-10 lg:py-0">
        <TypeAnimation
          sequence={[
            "Manage Your Hotel Effortlessly with Servexi.",
            1500,
            "Manage Your Hotel Effortlessly with our solution.",
            3000,
          ]}
          preRenderFirstString
          wrapper="span"
          speed={30}
          repeat={Infinity}
          className="text-monokai lg:text-5xl xs:px-5 xs:text-3xl font-bold lg:mt-48 xs:mt-24 text-center"
        />
        <h2 className="lg:text-2xl xs:px-5 xs:text-lg mt-5 text-center font-medium text-neutral-dark lg:w-[600px] xs:w-full">
          A complete management solution for hotel owners: staff management, real-time updates, inventory tracking, and more.
        </h2>
        <Link href={"/auth/register"} className="text-white text-button shadow-custom-black flex items-center justify-center gap-2 rounded bg-secondary px-2 py-3 lg:w-44 xs:w-[90%] lg:mt-5 xs:mt-12">
          Try for Free
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
        </Link>
        <motion.div
          initial={{
            y: "50%",
          }}
          animate={{
            y: "0%",
            transition: {
              duration: 2,
              type: "spring",
              bounce: 0.5,
            }
          }}

        >
          <Image src={DashboardImage} alt="dashboard image" className="w-full h-auto object-cover lg:mt-24 xs:mt-12 xs:rounded-lg lg:rounded-2xl shadow-2xl z-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
