"use client";

import Image, { StaticImageData } from "next/image";
import { ReactNode, FC, useState, useEffect } from "react";

import F1 from "@/public/Farm.jpg";
import F2 from "@/public/Farm2.jpg";
import F3 from "@/public/Farm3.jpg";

import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "@mantine/core";

import { toast, Toaster } from "react-hot-toast";
import { Form, Formik } from "formik";
import { IoMail } from "react-icons/io5";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import { login } from "@/src/services/authServices";
import { SUREAGRO_KEY } from "@/src/services/base";

interface iManualLoginPayload {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [index, setIndex] = useState<number>(0);
  const [change, setChange] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const data: {
    image: string | StaticImageData;
    header: string;
    description: string;
  }[] = [
    {
      image: F1,
      header: "Growing Together, Sustainably",
      description:
        "Dive into our commitment to sustainable farming practices. Learn how we cultivate growth that nourishes both the land and the community.",
    },
    {
      image: F2,
      header: "Innovation at Every Harvest",
      description:
        "Explore our cutting-edge solutions designed to enhance productivity and efficiency in every aspect of your agricultural operations.",
    },
    {
      image: F3,
      header: "Harvesting Connections",
      description:
        "Discover how we're building a vibrant community around shared knowledge and support, fostering growth and success together.",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex >= 2) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Toaster />
      <div className="w-[100vw] h-[100vh] overflow-hidden flex justify-between bg-white dark:bg-monokai">
        <div className="w-[50vw] h-full">
          <AnimatePresence>
            <motion.div
              key={index}
              initial={{ x: "-10%", opacity: 0 }}
              animate={{
                x: "0%",
                opacity: 1,
                transition: {
                  ease: "anticipate",
                  duration: 1.5,
                },
              }}
              exit={{
                x: "10%",
                opacity: 0,
                transition: {
                  ease: "linear",
                },
              }}
              className="relative w-[50vw]"
            >
              <Image
                src={data[index].image}
                alt="banner"
                className="w-[50vw] h-[100vh] object-cover absolute z-0 brightness-50"
              />

              <div className=" z-10 absolute flex flex-col justify-end w-full h-[86vh] text-center px-[20%]">
                <motion.h2
                  key={(index + 2) * 3}
                  initial={{
                    y: "-20%",
                    opacity: 0,
                  }}
                  animate={{
                    y: "0%",
                    opacity: 1,
                    transition: {
                      delay: 0.5,
                      duration: 1,
                      ease: "easeIn",
                      type: "spring",
                      bounce: 0.7,
                    },
                  }}
                  className="text-[40px] leading-[60px] text-white font-semibold"
                >
                  {data[index].header}
                </motion.h2>
                <motion.p
                  key={(index + 3) * 4}
                  initial={{
                    x: "-20%",
                    opacity: 0,
                  }}
                  animate={{
                    x: "0%",
                    opacity: 1,
                    transition: {
                      delay: 0.5,
                      duration: 1,
                      ease: "easeOut",
                      type: "spring",
                      bounce: 0.6,
                    },
                  }}
                  className=" text-white mt-5 med-3"
                >
                  {data[index].description}
                </motion.p>
                <div className="flex justify-center">
                  <div className="flex justify-between items-center w-[65%] mt-12">
                    {Array(3)
                      .fill(0)
                      .map((num, i) => {
                        return (
                          <div
                            key={i}
                            className={`${
                              i === index ? "bg-white" : "bg-white-20"
                            } w-[30%] h-0.5 rounded-full`}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="w-[50vw] h-full flex flex-col items-center justify-center">
          <div className="flex flex-col w-[450px] md:px-5 items-start">
            <div className="justify-between items-center w-full">
              <h1 className="font-bold text-monokai dark:text-white text-[32px] leading-[42px]">
                Welcome Back!
              </h1>
            </div>
            <p className="dark:text-neutral-light text-neutral-dark text-md pb-8 text-center">
              Log in to your Sure Agro account
            </p>

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validate={(values) => {
                const errors: Partial<iManualLoginPayload> = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }

                if (!values.password) {
                  errors.password = "Required";
                } else if (values.password.length < 8) {
                  errors.password =
                    "Password must be more at least 8 characters";
                }

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const data = await login(values.email, values.password);
                  window.localStorage.setItem(
                    SUREAGRO_KEY,
                    JSON.stringify(data)
                  );
                  toast.success("Welcome to Sure Agro");
                  setSubmitting(false);
                  setTimeout(() => {
                    window.location.replace("/dashboard");
                  }, 1000);
                } catch (error: any) {
                  let message: string = error.response.data.message;
                  if (!message.length) {
                    message =
                      "An error occurred while logging you in. Please try again later.";
                  }
                  toast.error(message);
                  setSubmitting(false);
                }
              }}
              validateOnMount={true}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isInitialValid,
                isValid,
              }) => (
                <Form onSubmit={handleSubmit} className="w-full" method="POST">
                  <div className="mb-4 flex flex-col gap-2 w-full relative">
                    <p className="text-md text-neutral-dark dark:text-neutral-light">
                      Email Address
                    </p>
                    <input
                      type="email"
                      value={values.email}
                      name="email"
                      placeholder="Enter your email address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="px-10 w-full"
                    />
                    <IoMail
                      className="text-contrast-base absolute top-[42px] left-2"
                      size={"22px"}
                    />
                    <p className="text-error">
                      {errors.email && touched.email && errors.email}
                    </p>
                  </div>
                  <div className="mb-4 flex flex-col gap-2 w-full relative">
                    <p className="text-md text-neutral-dark dark:text-neutral-light">
                      Password
                    </p>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      name="password"
                      placeholder="Enter your password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="px-10 w-full"
                    />
                    <RiLockPasswordFill
                      className="text-contrast-base absolute top-[42px] left-2"
                      size={"22px"}
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-[42px] right-2 text-contrast-base cursor-pointer"
                    >
                      {showPassword ? (
                        <MdVisibilityOff size={"22px"} />
                      ) : (
                        <MdVisibility size={"22px"} />
                      )}
                    </div>
                    <p className="text-error">
                      {errors.password && touched.password && errors.password}
                    </p>
                  </div>

                  <div className="pb-2 mt-10 w-full">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={` ${
                        isInitialValid
                          ? "bg-primary"
                          : isValid
                          ? "bg-primary"
                          : "bg-neutral-light dark:bg-neutral-dark"
                      } rounded w-full h-12 text-white font-semibold text-[16px] leading-[24px] md:leading-[25.6px] items-center flex justify-center`}
                    >
                      {isSubmitting ? <Loader color="white" /> : "Login"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
