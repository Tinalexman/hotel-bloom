"use client";

import React from "react";

import Image, { StaticImageData } from "next/image";
import Man1 from "@/public/man 1.jpg";
import Man2 from "@/public/man 2.png";
import Man3 from "@/public/man 3.jpeg";

import Woman1 from "@/public/woman 1.jpg";
import Woman2 from "@/public/woman 2.jpeg";
import Woman3 from "@/public/woman 3.jpg";

import Marquee from "react-fast-marquee";
import { FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";

interface iTestimony {
  name: string;
  role: string;
  image: StaticImageData | string;
  message: string;
  rating: number;
}

const Testimonies = () => {
  const testimonies: iTestimony[] = [
    {
      name: "Aisha Mohammed",
      role: "Hotel Manager",
      image: Woman1,
      message: "Our team was blown away by how easily we could assign permissions and customize dashboards for our staff. It's been a game-changer for our operations!",
      rating: 4,
    },
    {
      name: "Kunle Adeyemi",
      role: "Restaurant Owner",
      image: Man1,
      message: "The real-time updates feature has saved us so much time and stress. We can now respond quickly to any issues that arise during service.",
      rating: 5,
    },
    {
      name: "Nneoma Okoro",
      role: "General Manager",
      image: Woman2,
      message: "We were skeptical about switching to a new system, but the training was excellent and the support team has been fantastic throughout our journey.",
      rating: 5,
    },
    {
      name: "Tunde Oladele",
      role: "Bar Manager",
      image: Man2,
      message: "The ability to track inventory across multiple sections has reduced our waste and improved our bottom line significantly.",
      rating: 4,
    },
    {
      name: "Chiamaka Eze",
      role: "Front Desk Supervisor",
      image: Woman3,
      message: "I love how easy it is to add new staff members and update their permissions. It's made our HR processes so much smoother.",
      rating: 4,
    },
    {
      name: "Segun Ogunleye",
      role: "Executive Chef",
      image: Man3,
      message: "The comprehensive logs and reporting features have given us invaluable insights into our kitchen operations. We're now able to optimize our menu and reduce food costs.",
      rating: 5,
    }
  ];

  return (
    <div className="w-full flex flex-col gap-5 relative lg:py-20 xs:py-10">
      <div className="flex flex-col items-start gap-2 lg:px-28 xs:px-5">
        <h2 className="text-title text-monokai">
          Testimonials
        </h2>
        <h3 className="text-subbody text-neutral-dark">
          What Do Our Users Say
        </h3>
      </div>

      <Marquee speed={15}>
        {testimonies.map((tst, i) => (
          <div key={i} className="px-5 py-2">
            <div className="lg:w-[20rem] xs:w-[18rem] lg:h-[10rem] xs:h-[8rem] px-3 py-2 flex flex-col gap-5 rounded-xl bg-white shadow-custom">
              <div className="flex w-full justify-between items-center">
                <div className="w-fit gap-2 flex items-center">
                  <Image
                    src={tst.image}
                    alt={tst.name}
                    width={48}
                    height={48}
                    className="lg:size-12 xs:size-9 rounded-full object-cover"
                  />
                  <div className="flex flex-col w-fit">
                    <h2 className="text-subbody font-semibold text-monokai">{tst.name}</h2>
                    <p className="text-tiny font-medium text-neutral-dark">{tst.role}</p>
                  </div>
                </div>
                <div className="w-fit gap-[2px] flex items-center">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${i + 1 <= tst.rating
                          ? "text-orange-500"
                          : "text-gray-300"
                          }`}
                        size={14}
                      />
                    ))}
                </div>
              </div>
              <p className="text-small font-medium text-neutral-dark">
                {tst.message}
              </p>
            </div>
          </div>
        ))}
      </Marquee>

      <motion.div
        animate={{
          rotate: 360,
          transition: {
            duration: 2,
            repeat: Infinity,
          },
        }}
        className="lg:size-80 xs:size-48 border-2 border-secondary border-opacity-10 rounded-[2rem] absolute top-0 -right-10"
      />
      <motion.div
        animate={{
          rotate: -360,
          transition: {
            duration: 2,
            repeat: Infinity,
            delay: 1,
          },
        }}
        className="lg:size-80 xs:size-48 border-2 border-secondary border-opacity-10 rounded-[2rem] absolute top-0 -right-10"
      />
    </div>
  );
};

export default Testimonies;
