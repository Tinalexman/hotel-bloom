"use client";

import React, { useRef } from "react";

import { useInView, motion } from "framer-motion";
import { FaMapLocationDot, FaPhoneFlip } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: "some" });

  return (
    <div
      ref={ref}
      className="w-full flex flex-col place-content-center place-items-center gap-10 px-40 md:px-5 py-20 md:py-10"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-col gap-2 h-32 w-full">
          <h2 className="text-title text-monokai md:text-center">
            Send Us A Message
          </h2>
          <p className="text-subbody md:text-center text-neutral-dark font-medium w-1/2 md:w-full">
            Let&apos;s Craft Your Digital Future Together: Share Your Needs and
            We&apos;ll Deliver Excellence in Every Connection.
          </p>
        </div>
        <div
          ref={ref}
          className="w-full grid grid-cols-2 md:grid-cols-1 gap-10"
        >
          <motion.div
            animate={{
              x: isInView ? "0%" : "-100%",
              opacity: isInView ? 1 : 0,
              transition: {
                duration: 1.5,
                ease: "easeOut",
              },
            }}
            className="flex flex-col gap-6 w-full"
          >
            <input
              type="text"
              className="shadow-custom rounded bg-white w-full h-10 px-4"
              placeholder="Enter your full name"
            />
            <div className="w-full grid grid-cols-2 gap-4">
              <input
                type="tel"
                className="shadow-custom rounded bg-white w-full h-10 px-4"
                placeholder="Enter your phone number"
              />
              <input
                type="email"
                className="shadow-custom rounded bg-white w-full h-10 px-4"
                placeholder="Enter email address"
              />
            </div>
            <textarea
              className="shadow-custom rounded bg-white w-full h-32 px-4 py-2"
              placeholder="Enter message"
            />

            <button className="bg-secondary px-2 py-3 rounded text-button text-white mt-4">
              Send
            </button>
          </motion.div>
          <motion.div
            animate={{
              x: isInView ? "0%" : "100%",
              opacity: isInView ? 1 : 0,
              transition: {
                duration: 1.5,
                ease: "easeOut",
              },
            }}
            className="w-full flex flex-col md:gap-5 justify-between h-full"
          >
            <div className="w-full rounded bg-white shadow-custom flex flex-col px-4 py-3 gap-5">
              <FaMapLocationDot size={36} className="text-secondary" />
              <p className="font-medium">
                Some address
              </p>
            </div>
            <div className="w-full rounded bg-white shadow-custom flex flex-col px-4 py-3 gap-5">
              <FaPhoneFlip size={30} className="text-secondary" />
              <p className="font-medium">
                Some numbers
              </p>
            </div>
            <div className="w-full rounded bg-white shadow-custom flex flex-col px-4 py-3 gap-5">
              <IoMail size={36} className="text-secondary" />
              <p className="font-medium">a random email</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
