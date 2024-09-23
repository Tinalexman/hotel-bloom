import React, { FC, useState, useEffect } from "react";

import { Loader, Modal } from "@mantine/core";

import { Formik, Form } from "formik";
import { FaPerson } from "react-icons/fa6";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import { useUpdateStaff } from "@/src/hooks/staffHooks";
import { iStaff } from "@/src/stores/userStore";
import { IoMdClose } from "react-icons/io";
import {
  iValidationResponse,
  validatePassword,
  validateUsername,
} from "@/src/functions/validationFunctions";

interface iEditStaff {
  username?: string;
  password?: string;
}

const UpdateStaff: FC<{ staff: iStaff; onClose: () => void }> = ({
  staff,
  onClose,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loading, success, update } = useUpdateStaff();

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
                <h2 className="font-bold big-2">Update Staff</h2>
                <IoMdClose
                  className="cursor-pointer text-monokai"
                  size={"26px"}
                  onClick={onClose}
                />
              </div>

              <p className="text-neutral-dark text-lg">
                Update the details for{" "}
                <span className="font-semibold">{staff.username}</span>
              </p>
            </div>
            <Formik
              initialValues={{
                username: staff.username,
                password: "",
              }}
              validate={(values) => {
                const errors: Partial<iEditStaff> = {};

                if (!values.username && !values.password) {
                  errors.username = "The username or password are required";
                  errors.password = "The username or password are required";
                }

                if (values.username && values.password) {
                  errors.username = "Only the username or password is required";
                  errors.password = "Only the username or password is required";
                }

                if (values.username) {
                  const usernameValidationResponse: iValidationResponse =
                    validateUsername(values.username);
                  if (!usernameValidationResponse.valid) {
                    errors.username = usernameValidationResponse.message;
                  }
                }

                if (values.password) {
                  const passwordValidationResponse: iValidationResponse =
                    validatePassword(values.password);
                  if (!passwordValidationResponse.valid) {
                    errors.password = passwordValidationResponse.message;
                  }
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                update({ staff_id: staff.id, ...values });
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
                    <p className="text-neutral-dark text-sm">Staff Password</p>
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
                    {loading ? <Loader color="white.6" /> : "Update"}
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

export default UpdateStaff;
