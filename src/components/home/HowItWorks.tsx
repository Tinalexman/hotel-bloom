"use client";

import React, { useRef } from "react";

import Image from "next/image";
import City from "@/public/permissions.png";
import { motion, useInView } from "framer-motion";

interface iInfo {
  header: string;
  text: string;
}

const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: "some", once: true });

  const info: iInfo[] = [
    {
      header: "Sign Up",
      text: "Quick and easy registration",
    },
    {
      header: "Customize Permissions",
      text: "Set up staff and assign roles",
    },
    {
      header: "Monitor in Real Time",
      text: "Get live updates on inventory, staff actions and more",
    },
    {
      header: "Scale Your Business",
      text: "Effortlessly manage multiple sections and track performance.",
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
            How Does Servexi Work?
          </h2>
          <h3 className="text-subbody text-neutral-dark">
            Seamless and Intuitive Management
          </h3>
        </div>
        <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-4">
          {
            info.map((inf, i) => (
              <div key={i} className="w-full flex gap-3 pr-5 overflow-hidden bg-white shadow-custom-black rounded-lg">
                <div className="w-2 h-full bg-secondary" />
                <div className="flex flex-col gap-1 py-3">
                  <h3 className="text-body font-bold text-monokai">{inf.header}</h3>
                  <p className="text-small font-medium text-monokai">{inf.text}</p>
                </div>

              </div>
            ))
          }
        </div>
      </motion.div>
      <motion.div
        animate={{
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : 100,
          transition: {
            duration: 1,
            ease: "easeOut",
          },
        }}
        className="w-full h-[420px] rounded lg:block xs:hidden"
      >
        <Image
          src={City}
          alt="man browsing"
          className="w-full h-full rounded object-cover"
        />
      </motion.div>
    </div>
  );
};

export default HowItWorks;
