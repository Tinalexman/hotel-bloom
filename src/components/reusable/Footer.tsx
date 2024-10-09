import React from "react";

import Link from "next/link";

import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

import Icon from "@/public/logo.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="py-20 px-40 md:px-5 md:py-10 grid grid-cols-[1fr_1fr_1.5fr] md:grid-cols-1 gap-10 w-full">
      <div className="w-full flex flex-col">
        <div className="flex flex-col gap-5 md:gap-2">
          <h2 className="text-4xl md:text-2xl text-secondary font-bold">
            Servexi
          </h2>
          <p className="font-medium text-body mt-5">
            Empowering your digital journey with innovative, reliable solutions
            for a brighter tomorrow.
          </p>
          <div className="flex gap-4">
            <p className="text-body">Follow us on:</p>
            <div className="flex gap-3 items-center w-fit">
              <Link href={"https://x.com/Broadbasedcom"} target="__blank">
                <FaXTwitter size={20} className="text-secondary" />
              </Link>
              <Link
                href={"https://www.instagram.com/broadbasedcom"}
                target="__blank"
              >
                <FaInstagram size={20} className="text-secondary" />
              </Link>
              <Link
                href={
                  "https://www.youtube.com/channel/UCKyYNHGvO7KPwkOq9WvGVeQ"
                }
                target="__blank"
              >
                <FiYoutube size={20} className="text-secondary" />
              </Link>
            </div>
          </div>

          <div className="mt-2 border-grey-18 text-neutral text-small md:hidden">
            © Copyright {new Date().getFullYear()}, All Rights Reserved
          </div>
        </div>
      </div>
      <div className="w-full flex md:flex-col justify-around pt-20 md:gap-3 md:pt-0">
        <div className="flex flex-col gap-5 md:gap-3">
          <Link href={"/"} className="text-body font-semibold ">
            Home
          </Link>
          <Link href={"/"} className="text-body font-semibold ">
            About
          </Link>
        </div>
        <div className="flex flex-col gap-5 md:gap-3">
          <Link href={"/"} className="text-body font-semibold ">
            Services
          </Link>
          <Link href={"/"} className="text-body font-semibold ">
            Contact Us
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:hidden">
        <Image src={Icon} alt="logo" className="w-full h-auto" />
      </div>
      <div className="mt-2 border-grey-18 text-neutral text-small text-center md:block hidden">
        © Copyright {new Date().getFullYear()}, All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
