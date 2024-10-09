"use client";

import React, { useRef } from "react";

import Image from "next/image";
import City from "@/public/city.jpeg";
import { MdOutlineDone } from "react-icons/md";

import { motion, useInView } from "framer-motion";

const Location = () => {
  const places: string[] = ["Abuja", "Lagos", "Enugu", "Rivers", "Akwa Ibom"];

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: "some", once: true });

  return (
    <div
      ref={ref}
      className="w-full grid grid-cols-2 md:grid-cols-1 place-content-center place-items-center gap-10 px-40 md:px-5"
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
        <div className="flex flex-col gap-2">
          <h2 className="text-title text-dark md:text-center">
            Empowering Nigeria with High-Speed Internet
          </h2>
          <p className="text-body text-dark font-medium md:text-center">
            As pioneers in the telecommunications industry, we are proud to
            offer{" "}
            <span className="font-bold">
              Metro Fiber Optic Local Loop Services
            </span>{" "}
            across major business districts in Nigeria. Our commitment to
            excellence ensures businesses and individuals alike enjoy seamless
            connectivity, empowering growth and innovation nationwide.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {places.map((place, i) => (
            <div key={i} className="flex items-center gap-2">
              <MdOutlineDone className="text-secondary" />
              <h2 className="text-body text-dark font-bold">{place}</h2>
            </div>
          ))}
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
        className="w-full h-[420px] rounded"
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

export default Location;
