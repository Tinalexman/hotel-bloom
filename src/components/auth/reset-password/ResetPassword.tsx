"use client";

import React, { useEffect, Suspense, useState } from "react";

import { usePasswordReset } from "@/src/hooks/authHooks";

import { Loader } from "@mantine/core";
import { useFormik } from "formik";
import { MdToken } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import toast from "react-hot-toast";

import {
  iValidationResponse,
  validatePassword,
} from "@/src/functions/validationFunctions";

interface iResetPasswordPayload {
  email: string;
  token: string;
  password: string;
}

const ResetPassword = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ResetPasswordForm />
    </Suspense>
  );
};

const ResetPasswordForm = () => {
  const { loading, resetPassword, success } = usePasswordReset();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    setFieldValue,
  } = useFormik<iResetPasswordPayload>({
    initialValues: {
      email: "",
      token: "",
      password: "",
    },
    validate: (values) => {
      const errors: Partial<iResetPasswordPayload> = {};

      const passwordValidationResponse: iValidationResponse = validatePassword(
        values.password
      );
      if (!passwordValidationResponse.valid) {
        errors.password = passwordValidationResponse.message;
      }

      if (!values.token) {
        errors.token = "Required";
      } else if (values.token.length !== 6) {
        errors.token = "Token must be 6 digits";
      }

      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      resetPassword(values);
    },
  });

  useEffect(() => {
    let userEmail = searchParams.get("email");
    if (userEmail === null) {
      toast.error("Invalid Email");
      router.back();
    } else {
      setFieldValue("email", userEmail);
    }
  }, [router]);

  useEffect(() => {
    if (!loading && success) {
      router.replace(`/auth/login`);
    }
  }, [loading, success]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[400px] flex flex-col"
      method="POST"
    >
      <div className="flex flex-col w-full">
        <h1 className="font-bold text-monokai text-[32px] leading-[42px]">
          Setup Password
        </h1>
        <p className="text-neutral-dark text-lg">
          Choose a password easily remembered
        </p>
      </div>

      <div className=" mt-6 mb-4 flex flex-col gap-1 w-full relative">
        <input
          type="text"
          value={values.token}
          name="token"
          placeholder="Enter your token"
          onChange={(e) => {
            const result = e.target.value.trim();
            const resultToNumber = Number(result);
            if (!isNaN(resultToNumber)) {
              setFieldValue("token", result);
            }
          }}
          onBlur={handleBlur}
          className="px-10 w-full"
        />
        <MdToken
          className="text-contrast-base absolute top-2.5 left-2"
          size={"22px"}
        />
        <p className="text-error text-sm">
          {errors.token && touched.token && errors.token}
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
          disabled={loading}
          className={` ${
            isValid ? "bg-secondary" : "bg-neutral-light"
          } rounded w-full h-12 text-white font-semibold text-[16px] leading-[24px] md:leading-[25.6px] items-center flex justify-center`}
        >
          {loading ? <Loader color="white.6" /> : "Reset"}
        </button>
      </div>
    </form>
  );
};

export default ResetPassword;
