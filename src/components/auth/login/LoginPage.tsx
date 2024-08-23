"use client";

import { useState } from "react";

import { MdOutlineDoneAll } from "react-icons/md";

import Slider from "./Slider";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  const [page, setPage] = useState<number>(0);
  const [type, setType] = useState<"admin" | "manager" | "">("");

  //<a target="_blank" href="https://icons8.com/icon/AVe9YeyAXTql/hotel">Hotel</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
  //Photo by <a href="/photographer/wladek-46398">wladek</a> on <a href="/">Freeimages.com</a>
  //Photo by <a href="/photographer/a_kartha-39978">a_kartha</a> on <a href="/">Freeimages.com</a>
  //Photo by <a href="/photographer/a_kartha-39978">a_kartha</a> on <a href="/">Freeimages.com</a>

  const accountTypes: {
    header: string;
    description: string;
    route: "admin" | "manager";
  }[] = [
    {
      header: "Administrator",
      description: "Has full control of the content management system.",
      route: "admin",
    },
    {
      header: "Manager",
      description: "Has limited control of the content management system.",
      route: "manager",
    },
  ];

  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden flex justify-between bg-white dark:bg-monokai">
      <Slider />
      <div className="w-[50vw] h-full flex flex-col items-center justify-center">
        <div className="flex flex-col w-[450px] md:px-5 items-start">
          <div className="justify-between items-center w-full">
            <h1 className="font-bold text-monokai dark:text-white text-[32px] leading-[42px]">
              Welcome Back!
            </h1>
          </div>
          <p className="dark:text-neutral-light text-neutral-dark text-md pb-8 text-center">
            {page === 0
              ? "How would you be signing in to Sure Agro?"
              : "Log in to your Sure Agro account"}
          </p>

          {page === 0 && (
            <div className="flex flex-col gap-10 w-full">
              <div className="w-full flex flex-col gap-5">
                {accountTypes.map((ac, i) => (
                  <div
                    key={i}
                    onClick={() => setType(ac.route)}
                    className="w-full flex flex-col gap-3 p-5 rounded-xl bg-neutral-light dark:bg-neutral-dark cursor-pointer transition-all duration-300 ease-out hover:scale-105 scale-100"
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="big-2 font-semibold">{ac.header}</h2>
                      {type === ac.route && (
                        <MdOutlineDoneAll size={20} className="text-primary" />
                      )}
                    </div>
                    <p className="small-1 font-normal">{ac.description}</p>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                onClick={() => setPage(1)}
                disabled={type === ""}
                className={` ${
                  type !== ""
                    ? "bg-primary"
                    : "bg-neutral-light dark:bg-neutral-dark"
                } rounded w-full h-12 text-white font-semibold text-[16px] leading-[24px] md:leading-[25.6px] items-center flex justify-center`}
              >
                Continue
              </button>
            </div>
          )}

          {page === 1 && (
            <LoginForm type={type === "admin" ? "admin" : "manager"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
