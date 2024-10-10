"use client";

import React, { useRef } from "react";

import Link from "next/link";

import { SiInternetcomputer } from "react-icons/si";
import { MdDashboard, MdUpdate, MdOutlineInventory2 } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaLayerGroup, FaClipboardList } from "react-icons/fa";
import { IconType } from "react-icons";

import { motion, useInView } from "framer-motion";

interface iFeature {
  name: string;
  icon: IconType;
  description: string;
}

const Features = () => {
  const features: iFeature[] = [
    {
      name: "Staff Management",
      icon: FaPeopleGroup,
      description: "Add and manage staff roles with customized permissions.",
    },
    {
      name: "Custom Dashboards",
      icon: MdDashboard,
      description: "Tailored dashboard views based on staff permissions for more efficient management.",
    },
    {
      name: "Real-Time Updates",
      icon: MdUpdate,
      description: "Websockets provide live data on your business operations, ensuring you're always in the know.",
    },
    {
      name: "Section Management",
      icon: FaLayerGroup,
      description: "Manage different sections of your hotel, from the VIP bar to the rooftop lounge.",
    },
    {
      name: "Inventory Control",
      icon: MdOutlineInventory2,
      description: "Keep track of stock in real-time with automatic logging.",
    },
    {
      name: "Activity Logs",
      icon: FaClipboardList,
      description: "A detailed history of all changes and actions within your organization.",
    },
  ];

  const targetRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(targetRef, { amount: "some", once: true });

  return (
    <div className="flex flex-col w-full gap-8 items-center lg:px-28 xs:px-5 xs:py-10 lg:py-0 lg:mt-20 xs:mt-0 overflow-x-hidden relative">
      <div className="lg:w-[40rem] xs:w-full items-center lg:space-y-2 xs:space-y-3">
        <h2 className="text-title text-center text-monokai">
          What do <span className="text-secondary">we</span> offer?
        </h2>
        <h3 className="text-subbody text-center text-neutral-dark">
          All-In-One Hospitality Management Solution
        </h3>
      </div>
      <div
        ref={targetRef}
        className="w-full grid xs:grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={i}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 100,
                transition: {
                  duration: 1,
                  ease: "easeOut",
                  delay: i * 0.2,
                },
              }}
              className={`text-dark flex flex-col items-center gap-6 w-full h-[15rem] px-4 py-4`}
            >
              <Icon size={60} className="text-secondary" />
              <div className="flex flex-col gap-2 items-center">
                <p className="text-subdisplay font-bold text-center text-monokai">
                  {feature.name}
                </p>
                <p className="small-1 font-normal text-neutral-dark text-center">
                  {feature.description}
                </p>
              </div>

            </motion.div>
          );
        })}
      </div>

      <motion.div
        animate={{
          rotate: 360,
          transition: {
            duration: 4,
            ease: "easeIn",
            repeat: Infinity,
          },
        }}
        className="bg-primary bg-opacity-5 rounded-2xl size-[250px] absolute lg:-left-[150px] xs:-left-[200px] top-[160px]"
      />

      <motion.div
        animate={{
          rotate: -360,
          transition: {
            duration: 4,
            ease: "easeIn",
            repeat: Infinity,
            delay: 2,
          },
        }}
        className="bg-primary bg-opacity-5 rounded-2xl size-[250px] absolute lg:-right-[150px] xs:-right-[200px] bottom-[160px]"
      />
    </div>
  );
};

export default Features;
