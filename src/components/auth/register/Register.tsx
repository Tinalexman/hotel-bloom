"use client";

import React, { useState, useEffect } from "react";
import { iManualRegisterPayload, useRegister } from "@/src/hooks/authHooks";
import { Loader } from "@mantine/core";
import { Form, Formik } from "formik";
import { IoMail } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff, MdMapsHomeWork } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loading, success, data, register } = useRegister();
  const router = useRouter();

  useEffect(() => {
    if (success && data) {
      router.push(`/auth/verify-account?email=${data.email}`);
    }
  }, [success, data]);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        name: "",
        username: "",
        shift_hours: "",
      }}
      validate={(values) => {
        const errors: Partial<iManualRegisterPayload> = {};
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

        if (!values.username) {
          errors.username = "Required";
        } else if (values.username.length < 3) {
          errors.username = "Username must be more at least 3 characters";
        }

        if (!values.name) {
          errors.name = "Required";
        } else if (values.name.length < 3) {
          errors.name = "Organization Name must be more at least 3 characters";
        }

        if (values.shift_hours) {
          const n = Number(values.shift_hours);
          if (n > 24 || n < 1) {
            errors.shift_hours = "Hours must be between 1 and 24";
          }
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        register(values);
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
        setFieldValue,
      }) => (
        <Form
          onSubmit={handleSubmit}
          className="lg:w-[420px] xs:w-full lg:px-2.5 xs:px-5 flex flex-col overflow-y-scroll scrollbar-custom xs:pt-10 lg:pt-0"
          method="POST"
        >
          <div className="flex flex-col w-full lg:items-start xs:items-center ">
            <h1 className="font-bold text-monokai text-title">
              Hello There!
            </h1>
            <p className="text-neutral-dark text-lg">
              We are happy to have you at Servexi
            </p>
          </div>

          <div className=" mt-6 mb-4 flex flex-col gap-1 w-full relative">
            <input
              type="text"
              value={values.name}
              name="name"
              placeholder="Enter your company name"
              onChange={handleChange}
              onBlur={handleBlur}
              className="px-10 w-full"
            />
            <MdMapsHomeWork
              className="text-contrast-base absolute top-2.5 left-2"
              size={"22px"}
            />
            <p className="text-error">
              {errors.name && touched.name && errors.name}
            </p>
          </div>
          <div className="mb-4 flex flex-col gap-1 w-full relative">
            <input
              type="text"
              value={values.shift_hours}
              name="shift_hours"
              placeholder="Enter your shift hours (default is 12)"
              onChange={(e) => {
                const res = e.target.value.trim();
                if (!isNaN(Number(res))) {
                  setFieldValue("shift_hours", res);
                }
              }}
              onBlur={handleBlur}
              className="px-10 w-full"
            />
            <FaRegClock
              className="text-contrast-base absolute top-2.5 left-2"
              size={"22px"}
            />
            <p className="text-error">
              {errors.shift_hours && touched.shift_hours && errors.shift_hours}
            </p>
          </div>

          <div className="mb-4 flex flex-col gap-1 w-full relative">
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
              className="text-contrast-base absolute top-2.5 left-2"
              size={"22px"}
            />
            <p className="text-error">
              {errors.email && touched.email && errors.email}
            </p>
          </div>
          <div className="  mb-4 flex flex-col gap-1 w-full relative">
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
            <p className="text-error">
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
            <p className="text-error">
              {errors.password && touched.password && errors.password}
            </p>
          </div>

          <div className="pb-2 mt-10 w-full">
            <button
              type="submit"
              disabled={isSubmitting}
              className={` ${isInitialValid
                ? "bg-secondary"
                : isValid
                  ? "bg-secondary"
                  : "bg-neutral-light"
                } rounded w-full h-12 text-white font-semibold text-[16px] leading-[24px] md:leading-[25.6px] items-center flex justify-center`}
            >
              {loading ? <Loader color="white" /> : "Register"}
            </button>
          </div>

          <p className="text-neutral-dark text-center mt-10">
            Already have an account?{" "}
            <span>
              <Link
                href="/auth/login"
                className="text-secondary font-bold underline"
              >
                Login
              </Link>
            </span>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
