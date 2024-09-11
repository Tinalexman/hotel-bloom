"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Loader } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import OtpInput from "react-otp-input";
import { useVerify, useRequestNewToken } from "@/src/hooks/authHooks";

const VerifyAccount = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Content />
    </Suspense>
  );
};

const Content = () => {
  const [otp, setOtp] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const email: string | null = searchParams.get("email");

  const [seconds, setSeconds] = useState<number>(60);

  const {
    loading: loadingVerify,
    success: successVerify,
    verify,
  } = useVerify();

  const {
    loading: loadingNewTokenRequest,
    success: newTokenSuccess,
    request,
  } = useRequestNewToken();

  const handlePaste: React.ClipboardEventHandler = (event) => {
    const data = event.clipboardData.getData("text");
    const n = Number(data);
    if (!isNaN(n)) {
      setOtp(data);
    }
  };

  useEffect(() => {
    if (newTokenSuccess) {
      setSeconds(60);
    }
  }, [newTokenSuccess]);

  useEffect(() => {
    if (successVerify) {
      router.replace("/auth/login");
    }
  }, [successVerify]);

  useEffect(() => {
    if (!email) {
      router.back();
    } else {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          }
          clearInterval(intervalId);
          return prevSeconds;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [router, seconds]);

  return (
    <div className="w-full grid place-content-center">
      <div className="flex flex-col w-[400px] ">
        <div className="flex flex-col w-full">
          <h1 className="font-bold text-monokai text-[32px] leading-[42px]">
            Account Verification
          </h1>
          <p className="text-neutral-dark text-lg">
            A verification code has been sent to the{" "}
            <span className="font-bold">{email}</span>
          </p>
        </div>

        <div className="flex justify-center mt-5 w-full">
          <OtpInput
            value={otp}
            onChange={async (value: string) => {
              setOtp(value);
              if (value.length === 6) {
                const accountMail = email!;
                verify({ email: accountMail, token: value });
              }
            }}
            numInputs={6}
            shouldAutoFocus={true}
            onPaste={handlePaste}
            placeholder="000000"
            skipDefaultStyles={true}
            renderInput={(props) => <input {...props} />}
            inputStyle={"size-12 pl-4"}
            containerStyle={"w-full justify-center gap-4"}
          />
        </div>
        <p className="text-center text-contrast-base my-[60px] md:mt-10 med-3 md:text-[14px] md:leading-[22.5px] w-full">
          Didn&apos;t get email?
        </p>
        <div className="w-full">
          <button
            onClick={() => {
              if (seconds <= 0) {
                request({ email: email! });
              }
            }}
            className={`rounded w-full h-12 text-white font-medium text-[16px] leading-[24px] grid place-content-center ${
              seconds <= 0 ? "bg-secondary " : "bg-neutral-light"
            }  `}
          >
            {loadingVerify || loadingNewTokenRequest ? (
              <Loader color="white.6" />
            ) : (
              `Resend
                ${
                  seconds > 0
                    ? ` in ${seconds} second${seconds === 1 ? "" : "s"}`
                    : ""
                }`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
