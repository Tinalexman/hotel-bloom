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
        className={`lg:pr-24 lg:pl-10 xs:px-5 flex justify-between items-center shadow-custom-black w-full lg:h-20 xs:h-16`}
      >
        <Image src={Icon} alt="logo" className="w-[200px] h-auto" />
        {/* <div className="lg:flex lg:justify-center gap-8 lg:items-center xs:hidden w-full h-full">
          {navs.map((navItem, i) => (
            <Link
              href={navItem.link}
              key={i}
              className={`font-semibold text-monokai`}
            >
              {navItem.name}
            </Link>
          ))}
        </div> */}
        <div className="lg:flex w-fit h-full items-center gap-4 xs:hidden">
          <Link href={"/auth/login"} className="text-monokai flex items-center justify-center gap-2 rounded border border-monokai px-2 py-[0.4rem] w-32">
            Log In
          </Link>

          <Link href={"/auth/register"} className="text-white flex items-center justify-center gap-2 rounded bg-secondary px-2 py-2 w-32">
            Try for Free
          </Link>

        </div>
        <div className="w-full h-full xs:flex justify-end items-center lg:hidden">
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
          <div className="w-full h-full bg-white flex flex-col gap-10">
            <Image src={Icon} alt="logo" className="w-full h-auto" />
            {/* <div className="flex flex-col gap-3 w-full">
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
            </div> */}
            <div className="w-full flex flex-col gap-3">
              <Link href={"/auth/login"} className="text-monokai flex items-center justify-center gap-2 rounded border border-monokai px-2 py-[0.4rem] w-full">
                Log In
              </Link>

              <Link href={"/auth/register"} className="text-white flex items-center justify-center gap-2 rounded bg-secondary px-2 py-2 w-full">
                Try for Free
              </Link>
            </div>
          </div>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
