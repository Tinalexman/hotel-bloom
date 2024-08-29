import { FC, ReactNode } from "react";
import Slider from "@/src/components/auth/Slider";

const LoginPage: FC<{ children: ReactNode }> = ({ children }) => {
  //<a target="_blank" href="https://icons8.com/icon/AVe9YeyAXTql/hotel">Hotel</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden flex justify-between bg-monokai">
      <Slider />
      <div className="w-[50vw] h-full grid place-content-center">
        {children}
      </div>
    </div>
  );
};

export default LoginPage;
