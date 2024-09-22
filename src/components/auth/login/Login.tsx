"use client";

import React, { useEffect, useState, Suspense } from "react";

import { useLogin } from "@/src/hooks/authHooks";

import { Loader } from "@mantine/core";
import { Form, Formik } from "formik";
import { FaPerson } from "react-icons/fa6";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCurrentStaffStore } from "@/src/stores/userStore";
import {
  iValidationResponse,
  validatePassword,
  validateUsername,
} from "@/src/functions/validationFunctions";

interface iManualLoginPayload {
  username: string;
  password: string;
}

const Login = () => {
  return (
    <Suspense fallback={<Loader />}>
      <LoginForm />
    </Suspense>
  );
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loading, data, login, success } = useLogin();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (success && data) {
      if (shouldRedirectToPreviousPage()) {
        router.back();
      } else {
        const route = determineRoute();
        router.push(`/dashboard${route}`);
      }
    }
  }, [success, data]);

  const shouldRedirectToPreviousPage = () => {
    const redirect = searchParams.get("redirect");
    return redirect !== null && redirect === "true";
  };

  const determineRoute = () => {
    const currentStaff = useCurrentStaffStore.getState();
    const viewLogPermission = currentStaff.permissions.view_log;
    const createSectionPermission = currentStaff.permissions.create_section;
    const manageInventoryPermission = currentStaff.permissions.manage_inventory;
    const manageStaffPermission = currentStaff.permissions.manage_staff;
    const manageSectionPermission =
      currentStaff.permissions.managed_sections.length > 0;

    let route = "";
    if (manageSectionPermission || createSectionPermission) {
      route = "/sections";
    } else if (manageInventoryPermission) {
      route = "/inventory";
    } else if (manageStaffPermission) {
      route = "/staff";
    } else if (viewLogPermission) {
      route = "/logs";
    }

    return route;
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validate={(values) => {
        const errors: Partial<iManualLoginPayload> = {};
        const usernameValidationResponse: iValidationResponse =
          validateUsername(values.username);
        if (!usernameValidationResponse.valid) {
          errors.username = usernameValidationResponse.message;
        }

        const passwordValidationResponse: iValidationResponse =
          validatePassword(values.password);
        if (!passwordValidationResponse.valid) {
          errors.password = passwordValidationResponse.message;
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
          <p className="text-neutral-dark text-end">
            Forgot Password?{" "}
            <span>
              <Link
                href="/auth/forgot-password"
                className="text-secondary font-bold underline"
              >
                Click Here
              </Link>
            </span>
          </p>

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
            <p className="text-neutral-dark text-center mt-10">
              Don&apos;t have an account?{" "}
              <span>
                <Link
                  href="/auth/register"
                  className="text-secondary font-bold underline"
                >
                  Register
                </Link>
              </span>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
