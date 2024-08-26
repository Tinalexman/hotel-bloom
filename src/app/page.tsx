"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SERVEXI_KEY } from "../services/base";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    let data = window.localStorage.getItem(SERVEXI_KEY);
    if (data === null) {
      router.push("/auth/login");
      return;
    } else {
      let user: { token: string } = JSON.parse(data);
      let decodedToken = jwtDecode(user.token);

      const expTimeInSeconds = decodedToken.exp;
      if (expTimeInSeconds !== undefined) {
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        if (currentTimeInSeconds >= expTimeInSeconds) {
          router.push("/auth/login");
        } else {
          router.push("/dashboard");
        }
      } else {
        router.push("/auth/login");
      }
    }
  }, [router]);

  return <></>;
}
