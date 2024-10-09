"use client";

import Image from "next/image";
import Logo from "@/public/logo.png";

export default function NotfoundPage() {
  return (
    <div className="w-[100vw] h-[100vh] flex bg-white flex-col justify-center items-center">
      <Image src={Logo} alt="logo" className="w-[400px] h-auto object-cover" />
      <h1 className="text-6xl text-monokai">Page Not Found</h1>
      <p className="big-1 mt-5 text-monokai">There is nothing here ...</p>

      <button
        onClick={() => {
          window.location.replace("/");
        }}
        className="px-6 py-3 rounded font-cocogoose text-primary hover:text-white text-2xl mt-10 border-2 border-primary hover:bg-primary transition-all ease-out duration-300"
      >
        Go Home
      </button>
    </div>
  );
}
