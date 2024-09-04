import React, { FC, useState } from "react";

import { Loader, Modal } from "@mantine/core";

import { Formik, Form } from "formik";
import { FaPerson } from "react-icons/fa6";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

interface iAddStaff {
  username: string;
  password: string;
}

const Permissions: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Modal.Root opened={true} onClose={onClose} padding={0} top={0} centered>
      <Modal.Overlay />

      <Modal.Body>
        <Modal.Content>
          <div className="w-full p-10 bg-monokai flex flex-col gap-10 items-center">
            <div className="w-full">
              <h2 className="font-bold big-2">Staff Permission</h2>
            </div>
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validate={(values) => {
                const errors: Partial<iAddStaff> = {};

                if (!values.password) {
                  errors.password = "Required";
                } else if (values.password.length < 8) {
                  errors.password =
                    "Password must be more at least 8 characters";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {}}
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
                <Form className="w-full flex flex-col gap-2" method="POST">
                  <div className=" mb-4 flex flex-col gap-1 w-full">
                    <p className="text-neutral-light text-sm">Staff Username</p>
                    <div className="relative w-full">
                      <input
                        type="text"
                        value={values.username}
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="px-10 w-full"
                      />
                      <FaPerson
                        className="text-contrast-base absolute top-2.5 left-2"
                        size={"22px"}
                      />
                    </div>
                    <p className="text-error">
                      {errors.username && touched.username && errors.username}
                    </p>
                  </div>
                  <div className="mb-4 flex flex-col gap-1 w-full">
                    <p className="text-neutral-light text-sm">
                      Staff Password <span className="text-error">*</span>
                    </p>
                    <div className="relative w-full">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        name="password"
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
                    </div>
                    <p className="text-error">
                      {errors.password && touched.password && errors.password}
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={` ${
                      isInitialValid
                        ? "bg-secondary"
                        : isValid
                        ? "bg-secondary"
                        : "bg-neutral-dark"
                    } rounded mt-2 w-full h-12 text-white font-semibold text-[16px] leading-[24px] md:leading-[25.6px] items-center flex justify-center`}
                  >
                    {isSubmitting ? <Loader color="white" /> : "Create"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Content>
      </Modal.Body>
    </Modal.Root>
  );
};

export default Permissions;
