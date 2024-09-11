"use client";

import React, { useEffect, useState } from "react";

import { useLogin } from "@/src/hooks/authHooks";

import { Loader } from "@mantine/core";
import { Form, Formik } from "formik";
import { FaPerson } from "react-icons/fa6";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface iManualLoginPayload {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loading, data, login, success } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (success && data) {
      router.push(`/dashboard/overview`);
    }
  }, [success, data]);

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validate={(values) => {
        const errors: Partial<iManualLoginPayload> = {};
        if (!values.username) {
          errors.username = "Required";
        }

        if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length < 8) {
          errors.password = "Password must be at least 8 characters long";
        } else if (!/[A-Z]/.test(values.password)) {
          errors.password =
            "Password must contain at least one uppercase letter";
        } else if (!/[a-z]/.test(values.password)) {
          errors.password =
            "Password must contain at least one lowercase letter";
        } else if (!/[0-9]/.test(values.password)) {
          errors.password = "Password must contain at least one number";
        } else if (!/[!@#$%^&*()_+\-=\[\]{}|;':"\\/?]/.test(values.password)) {
          errors.password = "Password must contain at least one symbol";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        login(values);
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
        <Form
          onSubmit={handleSubmit}
          className="w-[400px] flex flex-col"
          method="POST"
        >
          <div className="flex flex-col w-full">
            <h1 className="font-bold text-monokai text-[32px] leading-[42px]">
              Welcome Back!
            </h1>
            <p className="text-neutral-dark text-lg">
              Log in to your Servexi account
            </p>
          </div>

          <div className=" mt-6 mb-4 flex flex-col gap-1 w-full relative">
            <input
              type="text"
              value={values.username}
              name="username"
              placeholder="Enter your username"
              onChange={handleChange}
              onBlur={handleBlur}
              className="px-10 w-full"
            />
            <FaPerson
              className="text-contrast-base absolute top-2.5 left-2"
              size={"22px"}
            />
            <p className="text-error text-sm">
              {errors.username && touched.username && errors.username}
            </p>
          </div>
          <div className="mb-4 flex flex-col gap-1 w-full relative">
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
              className="text-contrast-base absolute top-2.5 left-2"
              size={"22px"}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2.5 right-2 text-contrast-base cursor-pointer"
            >
              {showPassword ? (
                <MdVisibilityOff size={"22px"} />
              ) : (
                <MdVisibility size={"22px"} />
              )}
            </div>
            <p className="text-error text-sm">
              {errors.password && touched.password && errors.password}
            </p>
          </div>

          <div className="pb-2 mt-10 w-full">
            <button
              type="submit"
              disabled={isSubmitting}
              className={` ${
                isInitialValid
                  ? "bg-secondary"
                  : isValid
                  ? "bg-secondary"
                  : "bg-neutral-light"
              } rounded w-full h-12 text-white font-semibold text-[16px] leading-[24px] md:leading-[25.6px] items-center flex justify-center`}
            >
              {loading ? <Loader color="white.6" /> : "Login"}
            </button>
            <p className="text-neutral-dark text-center mt-2">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-secondary font-bold underline"
              >
                Register
              </Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
