"use client";

import { FC, ReactNode } from "react";
import Slider from "@/src/components/auth/Slider";

const LoginPage: FC<{ children: ReactNode }> = ({ children }) => {

  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden flex justify-between bg-white">
      <div className="lg:block xs:hidden">
        <Slider />
      </div>
      <div className="lg:w-[50vw] xs:w-full lg:h-full xs:h-auto lg:grid lg:place-content-center overflow-y-auto scrollbar-custom">
        {children}
      </div>
    </div>
  );
};

export default LoginPage;
