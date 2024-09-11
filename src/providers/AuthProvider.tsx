"use client";
import { useEffect } from "react";

import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathName = usePathname();

  // const determineIndex = () => {
  //   const current = pathName.split("/")[2];
  //   switch (current) {
  //     case "scout":
  //       return 0;
  //     case "player":
  //       return 1;
  //     case "coach":
  //       return 2;
  //   }

  //   return -1;
  // };

  // const page = determineIndex();
  const router = useRouter();

  const { getToken } = useToken();

  useEffect(() => {
    const token = getToken();
    if (token === undefined) {
      toast.error("Please login to continue");
      router.replace("/auth/login");
    }
  }, [router]);

  return <>{children}</>;
}

export const useToken = () => {
  const getToken = () => Cookies.get("servexi-token");
  const setToken = (token: string) => {
    const decoded = jwtDecode(token);
    let expiryDate: Date | undefined;
    if (decoded.exp) {
      expiryDate = new Date(decoded?.exp * 1000);
    }

    Cookies.set("servexi-token", token, {
      expires: expiryDate,
      secure: true,
      sameSite: "strict",
    });
  };
  const removeToken = () => {
    Cookies.remove("servexi-token");
  };

  return { getToken, setToken, removeToken };
};
