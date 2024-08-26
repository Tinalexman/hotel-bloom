import React, { FC, useState } from "react";

import { useLogin } from "@/src/hooks/authHooks";

import { Loader } from "@mantine/core";
import { Form, Formik } from "formik";
import { IoMail } from "react-icons/io5";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

interface iManualLoginPayload {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { fn } = useLogin();

  return (
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
          errors.password = "Password must be more at least 8 characters";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        window.location.assign("/dashboard/admin/overview");
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
            <h1 className="font-bold text-white text-[32px] leading-[42px]">
              Welcome Back!
            </h1>
            <p className="text-neutral-light text-lg">
              Log in to your Serviex account
            </p>
          </div>

          <div className=" mt-6 mb-4 flex flex-col gap-2 w-full relative">
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
  );
};

export default LoginForm;
