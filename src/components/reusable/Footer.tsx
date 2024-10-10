import React from "react";

import Link from "next/link";

import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

import Icon from "@/public/logo.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="lg:py-20 lg:px-28 xs:px-5 xs:py-10 grid lg:grid-cols-[1fr_1.5fr] xs:grid-cols-1 gap-10 w-full overflow-hidden">
      <div className="w-full flex flex-col">
        <div className="flex flex-col gap-5 md:gap-2">
          <p className="font-medium text-body mt-5 text-monokai">
            Revolutionizing hospitality management with intelligent systems and seamless operations
          </p>
          <div className="flex gap-4 text-monokai">
            <p className="text-body">Follow us on:</p>
            <div className="flex gap-3 items-center w-fit">
              <Link href={"https://x.com/"} target="__blank">
                <FaXTwitter size={20} className="text-secondary" />
              </Link>
              <Link
                href={"https://www.instagram.com/"}
                target="__blank"
              >
                <FaInstagram size={20} className="text-secondary" />
              </Link>
              <Link
                href={
                  "https://www.youtube.com/"
                }
                target="__blank"
              >
                <FiYoutube size={20} className="text-secondary" />
              </Link>
            </div>
          </div>

          <div className="mt-2  text-neutral text-small">
            © Copyright {new Date().getFullYear()}, All Rights Reserved
          </div>
        </div>
      </div>

      <div className="lg:flex lg:flex-col xs:hidden relative">
        <Image src={Icon} alt="logo" className="w-full h-auto absolute -right-[20%] -top-[70%]" />
      </div>

    </footer>
  );
};

export default Footer;
