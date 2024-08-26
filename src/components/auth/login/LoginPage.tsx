"use client";

import { useState } from "react";

import { MdOutlineDoneAll } from "react-icons/md";

import Slider from "./Slider";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  const [page, setPage] = useState<number>(0);
  const [type, setType] = useState<"admin" | "kitchen" | "bar" | "">("");

  //<a target="_blank" href="https://icons8.com/icon/AVe9YeyAXTql/hotel">Hotel</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden flex justify-between bg-monokai">
      <Slider />
      <div className="w-[50vw] h-full grid place-content-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
