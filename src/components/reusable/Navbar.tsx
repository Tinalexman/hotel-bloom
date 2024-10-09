import React, { FC } from "react";
import Link from "next/link";

import Icon from "@/public/logo.png";
import Image from "next/image";

import { Drawer } from "@mantine/core";

import { HiOutlineMenu } from "react-icons/hi";
import { useDisclosure } from "@mantine/hooks";

interface iNavItem {
  name: string;
  link: string;
}

const Navbar = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const navs: iNavItem[] = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/",
    },
    {
      name: "Services",
      link: "/",
    },
    {
      name: "Contact",
      link: "/",
    },
  ];
  return (
    <>
      <nav
        className={`px-40 md:px-5 grid grid-cols-[3fr_1fr] bg-white ease-out duration-75 transition-all md:grid-cols-2 place-content-center md:place-content-center md:place-items-start w-full h-20 md:h-16`}
      >
        <Image src={Icon} alt="logo" className="w-[200px] h-auto" />
        <div className="flex gap-8 items-center md:hidden">
          {navs.map((navItem, i) => (
            <Link
              href={navItem.link}
              key={i}
              className={`font-semibold text-monokai`}
            >
              {navItem.name}
            </Link>
          ))}
        </div>
        <div className="w-full h-full md:flex justify-end items-center hidden">
          <HiOutlineMenu
            onClick={open}
            className={`text-monokai`}
            size={22}
          />
        </div>
      </nav>
      {opened && (
        <Drawer
          opened={true}
          onClose={close}
          position="right"
          size={"80%"}
          top={0}
          radius={8}
        >
          <div className="w-full h-full flex flex-col gap-10">
            <Image src={Icon} alt="logo" className="w-full h-auto" />
            <div className="flex flex-col gap-3 w-full">
              {navs.map((navItem, i) => (
                <div
                  onClick={() => {
                    close();
                    window.location.assign(navItem.link);
                  }}
                  key={i}
                  className={`font-semibold text-dark`}
                >
                  {navItem.name}
                </div>
              ))}
            </div>
          </div>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
