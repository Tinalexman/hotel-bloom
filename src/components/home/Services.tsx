"use client";

import React, { useRef } from "react";

import Link from "next/link";

import { SiInternetcomputer } from "react-icons/si";
import { GiNetworkBars } from "react-icons/gi";
import { AiFillPhone } from "react-icons/ai";
import { IconType } from "react-icons";

import { motion, useInView } from "framer-motion";

interface iService {
  name: string;
  icon: IconType;
  description: string;
  link: string;
}

const Services = () => {
  const services: iService[] = [
    {
      link: "/",
      name: "Internet Service Provision",
      icon: SiInternetcomputer,
      description: "Fast, reliable internet for homes and businesses.",
    },
    {
      link: "/",
      name: "Telecoms Aggregation",
      icon: GiNetworkBars,
      description:
        "Optimize connectivity with our advanced aggregation services.",
    },
    {
      link: "/",
      name: "Voice Services",
      icon: AiFillPhone,
      description:
        "Crystal-clear voice communication for seamless conversations.",
    },
  ];

  const targetRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(targetRef, { amount: "some", once: true });

  return (
    <div className="flex flex-col w-full gap-8 items-center px-20 md:px-5 py-20 md:py-10 relative md:overflow-hidden">
      <div className="w-[40rem] md:w-full items-center space-y-2 md:space-y-3">
        <h2 className="text-title text-center text-monokai">
          What do we offer?
        </h2>
        <h3 className="text-subbody text-center text-neutral-dark">
          Discover our latest tech and customer-first strategies that transform
          internet, network aggregation, and voice communication.
        </h3>
      </div>
      <div
        ref={targetRef}
        className="w-full flex md:flex-col gap-8 items-center justify-center z-10"
      >
        {services.map((service, i) => {
          const Icon = service.icon;
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
              className={`text-dark flex flex-col items-center gap-6 w-[18rem] h-[15rem] px-4 py-4`}
            >
              <Icon size={60} className="text-secondary" />
              <div className="flex flex-col gap-2 items-center">
                <p className="text-subdisplay font-bold text-center text-dark">
                  {service.name}
                </p>
                <p className="text-small font-normal text-dark text-center">
                  {service.description}
                </p>
              </div>
              <Link
                href={service.link}
                className="font-bold text-subbody underline"
              >
                Learn More
              </Link>
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
        className="bg-secondary-accent bg-opacity-5 rounded-2xl size-[350px] absolute -left-[100px] md:-left-[300px] top-[60px]"
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
        className="bg-secondary-accent bg-opacity-5 rounded-2xl size-[350px] absolute -right-[100px] md:-right-[300px] bottom-[60px]"
      />
    </div>
  );
};

export default Services;
