"use client";

import React, { useRef } from "react";

import Image from "next/image";
import City from "@/public/bar_image.jpg";
import { motion, useInView } from "framer-motion";

interface iInfo {
  header: string;
  text: string;
}


const Reasons = () => {

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: "some", once: true });

  const info: iInfo[] = [
    {
      header: "Save Time",
      text: "Automate repetitive tasks and free up your time for more important things.",
    },
    {
      header: "Enhance Efficiency",
      text: "Real-time updates and custom dashboards ensure smooth operations.",
    },
    {
      header: "Boost Productivity",
      text: "Staff can focus on what matters most with role-based dashboards.",
    },
    {
      header: "Improve Accountability",
      text: "Detailed logs help track and verify actions within the organization.",
    },
  ]

  return (
    <div
      ref={ref}
      className="w-full grid lg:grid-cols-2 xs:grid-cols-1 place-content-center place-items-center gap-10 lg:px-28 xs:px-5"
    >

      <motion.div
        animate={{
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : 100,
          transition: {
            duration: 1,
            ease: "easeOut",
          },
        }}
        className="w-full h-[420px] rounded"
      >
        <Image
          src={City}
          alt="man browsing"
          className="w-full h-full rounded object-cover"
        />
      </motion.div>
      <motion.div
        animate={{
          opacity: isInView ? 1 : 0,
          x: isInView ? 0 : -100,
          transition: {
            duration: 1,
            ease: "easeOut",
          },
        }}
        className="w-full flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2 lg:items-start xs:items-center">
          <h2 className="text-title text-monokai">
            Why Choose <span className="text-secondary">Servexi</span>?
          </h2>
          <h3 className="text-subbody text-neutral-dark">
            The Ultimate Tool for Hotel Owners
          </h3>
        </div>
        <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-4 z-10">
          {
            info.map((inf, i) => (
              <div key={i} className="w-full flex justify-between pl-5 overflow-hidden bg-white shadow-custom-black rounded-lg">
                <div className="flex flex-col gap-1 py-3 w-fit">
                  <h3 className="text-body font-bold text-monokai">{inf.header}</h3>
                  <p className="text-small font-medium text-monokai">{inf.text}</p>
                </div>
                <div className="w-2 h-full bg-secondary" />
              </div>
            ))
          }
        </div>
      </motion.div>
    </div>
  );
};

export default Reasons;
