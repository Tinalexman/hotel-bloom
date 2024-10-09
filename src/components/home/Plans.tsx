"use client";

import React, { useRef, useState } from "react";

import { MdOutlineDone } from "react-icons/md";

import { motion, useInView } from "framer-motion";

interface iPlan {
  title: string;
  subtitle: string;
  limit: number;
  price: number;
  features: string[];
}

const Plans = () => {
  const plans: iPlan[] = [
    {
      title: "Regular",
      subtitle: "RESIDENTIAL",
      limit: 10,
      price: 12500,
      features: [
        "Telephone Line",
        "30 Days Validity",
        "Dynamic IP Address",
        "Free calls within the estate",
        "Customer Care Services",
      ],
    },
    {
      title: "Platinum",
      subtitle: "BUSINESS",
      limit: 50,
      price: 33900,
      features: [
        "Telephone Line",
        "30 Days Validity",
        "Dynamic IP Address",
        "Free calls within the estate",
        "Customer Care Services",
      ],
    },
    {
      title: "Royal",
      subtitle: "BUSINESS",
      limit: 100,
      price: 59500,
      features: [
        "Telephone Line",
        "30 Days Validity",
        "Dynamic IP Address",
        "Free calls within the estate",
        "Customer Care Services",
      ],
    },
  ];

  const targetRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(targetRef, { amount: "some" });
  const [index, setIndex] = useState<number>(-1);

  return (
    <div className="flex flex-col w-full gap-8 items-center px-40 py-20 md:px-5 md:py-10 relative">
      <div className="w-[40rem] md:w-full items-center space-y-2 md:space-y-3">
        <h2 className="text-title text-center text-dark">
          Our Best Value Internet Packages
        </h2>
        <h3 className="text-subbody text-center text-neutral">
          Explore Our Tailored Packages Designed to Elevate Your Connectivity
          Experience
        </h3>
      </div>
      <div
        ref={targetRef}
        className="w-full grid grid-cols-3 md:grid-cols-1 gap-8 place-items-center px-10 md:px-0"
      >
        {plans.map((plan, i) => {
          return (
            <motion.div
              whileHover={{
                scale: 1.02,
                transition: {
                  duration: 0.3,
                  ease: "easeIn",
                  type: "spring",
                  bounce: 0.6,
                },
              }}
              animate={{
                y: isInView ? "0%" : "20%",
                transition: {
                  ease: "easeIn",
                  duration: 1,
                  delay: i * 0.25,
                  type: "spring",
                  bounce: 0.7,
                },
              }}
              key={i}
              onMouseEnter={() => {
                if (index === i) return;
                setIndex(i);
              }}
              onMouseLeave={() => {
                setIndex(-1);
              }}
              className={`${
                index === i ? "bg-secondary text-white" : "text-dark bg-white"
              } flex flex-col items-center gap-6 w-full h-[25rem] px-4 py-8 
                 shadow-custom md:rounded-2xl
                 ${
                   i === 0
                     ? "rounded-l-2xl "
                     : i === 2
                     ? "rounded-r-2xl"
                     : "rounded-none"
                 }
                 `}
            >
              <div className="flex flex-col gap-1 items-center">
                <h2 className="text-subdisplay font-bold">{plan.title}</h2>
                <p className="text-small font-medium">{plan.subtitle}</p>
              </div>
              <h2
                className={`text-subtitle ${
                  index === i ? "text-white" : "text-primary"
                }`}
              >
                ₦{plan.price.toLocaleString("en-US")}
                <span className="text-small font-normal">/Month</span>
              </h2>

              <div className="flex flex-col items-center gap-3">
                {plan.features.map((feature, pi) => (
                  <div key={pi} className={` flex gap-2 items-center`}>
                    <MdOutlineDone
                      className={`text-${index === i ? "white" : "primary"}`}
                    />
                    <h2
                      className={`text-small font-semibold ${
                        index === i ? "text-white" : "text-dark"
                      }`}
                    >
                      {feature}
                    </h2>
                  </div>
                ))}
              </div>

              <button
                className={`w-[70%] h-10 text-primary rounded ${
                  index === i
                    ? "bg-white shadow-custom"
                    : "border border-primary"
                } font-semibold`}
              >
                Join Now
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Plans;
