import React, { FC, useState } from "react";
import { iCreateManagerPayload } from "@/src/services/managerServices";
import { useCreateManager } from "@/src/hooks/managerHooks";
import { CgProfile } from "react-icons/cg";
import { IoMail } from "react-icons/io5";
import { Form, Formik } from "formik";
import { Loader, Modal } from "@mantine/core";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const AddManagerModal: FC<{ close: () => void }> = ({ close }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { create } = useCreateManager();

  return (
    <Modal.Root
      opened={true}
      onClose={close}
      centered
      top={"0px"}
      padding={"0px"}
    >
      <Modal.Overlay />
      <Modal.Body>
        <Modal.Content>
          <div className="bg-white dark:bg-monokai flex flex-col gap-5 px-10 py-8 shadow-custom-black dark:shadow-custom-white">
            <h1 className="big-2 font-[700] text-center">Add New Manager</h1>

            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                businessName: "",
              }}
              validate={(values) => {
                const errors: Partial<iCreateManagerPayload> = {};

                if (!values.firstName) {
                  errors.firstName = "Required";
                } else if (values.firstName.length < 3) {
                  errors.firstName =
                    "First Name must be more at least 3 characters";
                }

                if (!values.lastName) {
                  errors.lastName = "Required";
                } else if (values.lastName.length < 3) {
                  errors.lastName =
                    "Last Name must be more at least 3 characters";
                }

                if (!values.businessName) {
                  errors.businessName = "Required";
                } else if (values.businessName.length < 3) {
                  errors.businessName =
                    "Business Name must be more at least 3 characters";
                }

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
              onSubmit={async (values) => {
                create(
                  {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                    businessName: values.businessName,
                  },
                  close
                );
              }}
              validateOnChange={false}
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
                  className="w-full flex flex-col items-center"
                >
                  <div className="mt-5 flex flex-col gap-5 w-full">
                    <div className="w-full flex flex-col gap-1 relative">
                      <label className="text-md text-neutral-dark dark:text-neutral-light">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter first name"
                        className="w-full pl-10 pr-4"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                      />
                      <CgProfile
                        className="text-contrast-base absolute top-[38px] left-2"
                        size={"22px"}
                      />
                      <p className="text-error">
                        {errors.firstName &&
                          touched.firstName &&
                          errors.firstName}
                      </p>
                    </div>
                    <div className="w-full flex flex-col gap-1 relative">
                      <label className="text-md text-neutral-dark dark:text-neutral-light">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter last name"
                        className="w-full pl-10 pr-4"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                      />
                      <CgProfile
                        className="text-contrast-base absolute top-[38px] left-2"
                        size={"22px"}
                      />
                      <p className="text-error">
                        {errors.lastName && touched.lastName && errors.lastName}
                      </p>
                    </div>
                    <div className="w-full flex flex-col gap-1 relative">
                      <label className="text-md text-neutral-dark dark:text-neutral-light">
                        Business Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter business name"
                        className="w-full pl-10 pr-4"
                        name="businessName"
                        value={values.businessName}
                        onChange={handleChange}
                      />
                      <CgProfile
                        className="text-contrast-base absolute top-[38px] left-2"
                        size={"22px"}
                      />
                      <p className="text-error">
                        {errors.businessName &&
                          touched.businessName &&
                          errors.businessName}
                      </p>
                    </div>
                    <div className="w-full flex flex-col gap-1 relative">
                      <label className="text-md text-neutral-dark dark:text-neutral-light">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter email"
                        className="w-full pl-10 pr-4"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                      <IoMail
                        className="text-contrast-base absolute top-[38px] left-2"
                        size={"22px"}
                      />
                      <p className="text-error">
                        {errors.email && touched.email && errors.email}
                      </p>
                    </div>
                    <div className="w-full flex flex-col gap-1 relative">
                      <label className="text-md text-neutral-dark dark:text-neutral-light">
                        Password
                      </label>
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
                        className="text-contrast-base absolute top-[38px] left-2"
                        size={"22px"}
                      />
                      <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-[38px] right-2 text-contrast-base cursor-pointer"
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
                  </div>

                  <div className="pb-2 mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={` ${
                        isInitialValid
                          ? "bg-primary"
                          : isValid
                          ? "bg-primary"
                          : "bg-neutral-light dark:bg-neutral-dark"
                      } rounded w-[120px] h-12 text-white font-semibold text-[16px] leading-[24px] md:leading-[25.6px] items-center flex justify-center`}
                    >
                      {isSubmitting ? <Loader color="white" /> : "Add Manager"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Content>
      </Modal.Body>
    </Modal.Root>
  );
};

export default AddManagerModal;
