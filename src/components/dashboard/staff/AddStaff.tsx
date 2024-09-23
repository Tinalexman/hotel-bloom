import React, { FC, useState, useEffect } from "react";

import { Loader, Modal } from "@mantine/core";

import { Formik, Form } from "formik";
import { FaPerson } from "react-icons/fa6";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import { useCreateStaff } from "@/src/hooks/staffHooks";
import { IoMdClose } from "react-icons/io";
import {
  iValidationResponse,
  validatePassword,
  validateUsername,
} from "@/src/functions/validationFunctions";

interface iAddStaff {
  username?: string;
  password: string;
}

const AddStaff: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loading, success, register } = useCreateStaff();

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success]);

  return (
    <Modal.Root opened={true} onClose={onClose} padding={0} top={0} centered>
      <Modal.Overlay />

      <Modal.Body>
        <Modal.Content>
          <div className="w-full p-6 bg-white text-monokai flex flex-col gap-10 items-center">
            <div className="w-full">
              <div className=" justify-between items-center flex w-full">
                <h2 className="font-bold big-2">Create New Staff</h2>
                <IoMdClose
                  className="cursor-pointer text-monokai"
                  size={"26px"}
                  onClick={onClose}
                />
              </div>
              <p className="text-neutral-dark text-lg">
                Fields marked with <span className="text-error">*</span> are
                required
              </p>
            </div>
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validate={(values) => {
                const errors: Partial<iAddStaff> = {};

                if (values.username) {
                  const usernameValidationResponse: iValidationResponse =
                    validateUsername(values.username);
                  if (!usernameValidationResponse.valid) {
                    errors.username = usernameValidationResponse.message;
                  }
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
                isSubmitting,
                isInitialValid,
                isValid,
              }) => (
                <Form className="w-full flex flex-col gap-2" method="POST">
                  <div className=" mb-4 flex flex-col gap-1 w-full">
                    <p className="text-neutral-dark text-sm">Staff Username</p>
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
                    <p className="text-neutral-dark text-sm">
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
                        : "bg-neutral-light"
                    } rounded mt-2 w-full h-12 text-white font-semibold text-[16px] leading-[24px] md:leading-[25.6px] items-center flex justify-center`}
                  >
                    {loading ? <Loader color="white.6" /> : "Create"}
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

export default AddStaff;
