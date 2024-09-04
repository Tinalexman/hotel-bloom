"use client";

import React, { Suspense, useState, useEffect } from "react";

import { Loader } from "@mantine/core";
import { useSearchParams } from "next/navigation";

import toast from "react-hot-toast";

import OtpInput from "react-otp-input";

const VerifyAccount = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Content />
    </Suspense>
  );
};

const Content = () => {
  const searchParams = useSearchParams();
  const email: string | null = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(60);

  const handlePaste: React.ClipboardEventHandler = (event) => {
    const data = event.clipboardData.getData("text");
    if (!Number.isNaN(data)) {
      setOtp(data);
    }
  };

  useEffect(() => {
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
  }, [seconds]);

  return (
    <>
      {loading ? (
        <div className="flex h-[40vh] justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="flex flex-col w-[400px] md:w-full md:px-5 items-start">
            <div className="md:flex md:flex-row justify-between items-center w-full md:pt-6 pb-6 md:pb-4 md:relative">
              <h1 className="font-bold text-white md:text-[20px] md:leading-[30px] text-[32px] leading-[42px] md:text-center w-full md:absolute">
                Account Verification
              </h1>
            </div>
            <p className="med-3 text-contrast-base md:text-[14px] md:leading-[24px] text-light-black-4 pb-4 md:pb-10 md:text-center md:w-full">
              Account activation link has been sent to the email address{" "}
              <span className="font-bold">{email}</span> provided
            </p>

            <div className="flex justify-center mt-5 w-full">
              <OtpInput
                value={otp}
                onChange={async (value: string) => {
                  setOtp(value);
                  if (value.length === 6) {
                    const accountMail = email!;
                    // await verifyOTP({ email: accountMail, token: value });
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
            <div className="md:mt-[35vh] w-full">
              <button
                onClick={() => {
                  if (seconds <= 0) {
                    // resendOTP(email!);
                  }
                }}
                className={`rounded w-full h-12 font-medium text-[16px] leading-[24px] md:leading-[25.6px] ${
                  seconds <= 0
                    ? "bg-blue-base text-white"
                    : "bg-blue-10 text-blue-base"
                }  `}
              >
                Resend
                {seconds > 0 &&
                  ` in ${seconds} second${seconds === 1 ? "" : "s"}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyAccount;
