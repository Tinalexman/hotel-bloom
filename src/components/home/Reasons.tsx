"use client";

import React, { useRef } from "react";

import Image from "next/image";
import Man from "@/public/man_browsing.jpeg";

import { motion, useInView } from "framer-motion";

const Reasons = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: "some", once: true });

  return (
    <div
      ref={ref}
      className="w-full grid grid-cols-2 md:grid-cols-1 place-items-center gap-10 px-40 md:px-5 relative"
    >
      <motion.div
        animate={{
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : -100,
          transition: {
            duration: 1,
            ease: "easeOut",
          },
        }}
        className="w-full h-[550px] rounded object-cover block md:hidden"
      >
        <Image
          src={Man}
          alt="man browsing"
          className="w-full h-full rounded object-cover"
        />
      </motion.div>
      <motion.div
        animate={{
          opacity: isInView ? 1 : 0,
          x: isInView ? 0 : 100,
          transition: {
            duration: 1,
            ease: "easeOut",
          },
        }}
        className="w-full flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-title md:text-center text-dark">
            Why Choose{" "}
            <span className="text-primary">
              Broad<span className="text-secondary">based</span>
            </span>
            ?
          </h2>
          <p className="text-body text-dark font-medium md:text-center">
            At Broadbased, we believe in delivering more than just internet
            service; we provide a gateway to endless possibilities. Our
            commitment to reliability, coupled with our customer-centric
            approach, ensures that you receive not just a service, but a
            seamless experience tailored to your needs.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <ul className="list-disc pl-5 text-body text-dark">
            <li>
              <strong>Unrivaled Reliability:</strong> Our robust infrastructure
              guarantees uninterrupted connectivity, keeping you online when it
              matters most.
            </li>
            <li>
              <strong>Customer-Centric Service:</strong> We prioritize your
              satisfaction with dedicated support and personalized solutions to
              meet your unique requirements.
            </li>
            <li>
              <strong>Innovative Solutions:</strong> Stay ahead with our
              cutting-edge technology and innovative services designed to
              empower your digital journey.
            </li>
            <li>
              <strong>Community Engagement:</strong> As part of our commitment
              to giving back, we actively participate in community development
              initiatives across Nigeria.
            </li>
          </ul>
        </div>
      </motion.div>
      <motion.div
        animate={{
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : -100,
          transition: {
            duration: 1,
            ease: "easeOut",
          },
        }}
        className="w-full h-[550px] rounded object-cover md:block hidden"
      >
        <Image
          src={Man}
          alt="man browsing"
          className="w-full h-full rounded object-cover"
        />
      </motion.div>
      <motion.div
        animate={{
          scale: [1.0, 1.2, 1.0],
          transition: {
            duration: 3.5,
            ease: "easeInOut",
            repeat: Infinity,
          },
        }}
        className="size-[150px] md:size-[120px] border-2 border-secondary border-opacity-30 rounded-full absolute md:-right-[80px] -right-[60px] bottom-0"
      />
      <motion.div
        animate={{
          scale: [1.0, 1.2, 1.0],
          transition: {
            duration: 3.5,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0.5,
          },
        }}
        className="size-[150px] md:size-[120px] border-2 border-secondary border-opacity-30 rounded-full absolute md:-right-[100px] -right-[20px] bottom-0"
      />

      <motion.div
        animate={{
          scale: [1.0, 1.2, 1.0],
          transition: {
            duration: 3.5,
            ease: "easeInOut",
            repeat: Infinity,
          },
        }}
        className="size-[150px] md:size-[120px] border-2 border-secondary border-opacity-30 rounded-full absolute -left-[80px] md:-left-[100px] top-0"
      />
      <motion.div
        animate={{
          scale: [1.0, 1.2, 1.0],
          transition: {
            duration: 3.5,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0.5,
          },
        }}
        className="size-[150px] md:size-[120px] border-2 border-secondary border-opacity-30 rounded-full absolute -left-[40px] md:-left-[80px] top-0"
      />
    </div>
  );
};

export default Reasons;
