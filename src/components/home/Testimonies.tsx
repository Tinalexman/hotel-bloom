"use client";

import React from "react";

import Image from "next/image";
import Dog from "@/public/dog.jpg";

import Marquee from "react-fast-marquee";
import { FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";

interface iTestimony {
  name: string;
  role: string;
  image: string;
  message: string;
  rating: number;
}

const Testimonies = () => {
  const testimonies: iTestimony[] = Array(10).fill({
    name: "John Doe",
    role: "Software Engineer",
    image: Dog,
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 4,
  });

  return (
    <div className="w-full flex flex-col gap-5 relative py-20 md:py-10">
      <div className="flex md:flex-col gap-5 items-center px-40 md:px-5">
        <h2 className="text-title md:text-center text-monokai w-[18rem] md:w-full">
          Hear from Our Happy Customers
        </h2>
        <h3 className="text-subbody md:text-center text-neutral-dark w-[30rem] md:w-full">
          See firsthand accounts of transformation and success stories from
          individuals and businesses who&apos;ve experienced unparalleled growth
          and satisfaction through our innovative solutions.
        </h3>
      </div>

      <Marquee speed={15}>
        {testimonies.map((tst, i) => (
          <div key={i} className="px-5 py-2">
            <div className="w-[20rem] md:w-[18rem] h-[9rem] px-3 py-2 flex flex-col gap-5 rounded bg-white shadow-custom">
              <div className="flex w-full justify-between items-center">
                <Image
                  src={tst.image}
                  alt={tst.name}
                  width={48}
                  height={48}
                  className="size-12 rounded-full"
                />
                <div className="flex flex-col w-fit">
                  <h2 className="text-button font-semibold text-monokai">{tst.name}</h2>
                  <p className="text-small font-medium text-neutral-dark">{tst.role}</p>
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
              <p className="text-small font-medium md:text-center">
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
        className="size-80 border-2 border-secondary border-opacity-10 rounded-[2rem] absolute top-0 -right-10"
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
        className="size-80 border-2 border-secondary border-opacity-10 rounded-[2rem] absolute top-0 -right-10"
      />
    </div>
  );
};

export default Testimonies;
