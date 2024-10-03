import React from "react";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/Logo.png";

import Sample from "@/public/servexi dashboard.png";

const Hero = () => {
  return (
    <div className="w-full flex flex-col h-[100vh] bg-white relative">
      <div className="w-full flex items-center justify-between pl-10 pr-20">
        <Image
          src={Logo}
          alt="logo"
          className="w-[200px] h-auto object-cover"
        />
        <div className="w-1/2 flex items-center gap-5"></div>
        <div className="w-fit gap-4 flex items-center">
          <Link
            href={"/auth/login"}
            className="text-monokai border border-monokai rounded px-4 py-2"
          >
            Login
          </Link>
          <Link
            href={"/auth/register"}
            className="text-white bg-secondary rounded px-4 py-2 hover:scale-105 scale-100 duration-300 ease-out transition-transform"
          >
            Start For Free
          </Link>
        </div>
      </div>
      <div className="pl-20 flex flex-col gap-4 w-[700px] mt-20">
        <h1 className="big-6 font-bold">
          Streamline Your Hospitality Business with{" "}
          <span className="text-secondary">Servexi</span>
        </h1>
        <h3 className="font-medium text-monokai-faded text-2xl">
          Effortlessly manage staff, inventory, and operations in one intuitive
          platform.
        </h3>
        <Link
          href={"/auth/register"}
          className="mt-5 text-white bg-secondary rounded w-40 grid place-content-center py-2 hover:scale-105 scale-100 duration-300 ease-out transition-transform"
        >
          Start For Free
        </Link>
      </div>
      {/* <Image
        src={Sample}
        alt="sample"
        width={200}
        height={200}
        className="object-cover w-[70%] h-auto right-20 top-28 perspective-1000 transform rotate-x-[30deg] rotate-y-[45deg] rotate-z-[10deg] transition-transform duration-500 ease-in-out hover:rotate-x-[60deg] hover:rotate-y-[75deg] hover:rotate-z-[20deg]"
      /> */}
    </div>
  );
};

export default Hero;
