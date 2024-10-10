"use client";

import React, { useEffect } from "react";

import { useRequestPasswordReset } from "@/src/hooks/authHooks";

import { Loader } from "@mantine/core";
import { useFormik } from "formik";
import { IoMail } from "react-icons/io5";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const { loading, requestReset, success } = useRequestPasswordReset();
  const router = useRouter();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
  } = useFormik<{ email: string }>({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors: Partial<{ email: string }> = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      requestReset(values);
    },
  });

  useEffect(() => {
    if (!loading && success) {
      router.push(`/auth/reset-password?email=${values.email}`);
    }
  }, [loading, success]);

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:w-[400px] xs:w-full flex flex-col xs:px-5 lg:px-0 xs:pt-10 lg:pt-0"
      method="POST"
    >
      <div className="flex flex-col w-full lg:items-start xs:items-center ">
        <h1 className="font-bold text-monokai text-title">
          Forgot your password?
        </h1>
        <p className="text-neutral-dark text-lg">
          Provide the email you registered with us.
        </p>
      </div>

      <div className=" mt-6 mb-4 flex flex-col gap-1 w-full relative">
        <input
          type="text"
          value={values.email}
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          onBlur={handleBlur}
          className="px-10 w-full"
        />
        <IoMail
          className="text-contrast-base absolute top-2.5 left-2"
          size={"22px"}
        />
        <p className="text-error text-sm">
          {errors.email && touched.email && errors.email}
        </p>
      </div>

      <div className="pb-2 mt-10 w-full">
        <button
          type="submit"
          disabled={loading}
          className={` ${isValid ? "bg-secondary" : "bg-neutral-light"
            } rounded w-full h-12 text-white font-semibold text-[16px] leading-[24px] md:leading-[25.6px] items-center flex justify-center`}
        >
          {loading ? <Loader color="white.6" /> : "Send Reset Token"}
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
