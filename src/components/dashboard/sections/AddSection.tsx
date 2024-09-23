import React, { FC, useEffect } from "react";

import { Loader, Modal } from "@mantine/core";

import { Formik, Form } from "formik";
import { MdLocalOffer } from "react-icons/md";

import { useCreateSection } from "@/src/hooks/sectionHooks";
import { IoMdClose } from "react-icons/io";

const AddSection: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { loading, success, register } = useCreateSection();

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
                <h2 className="font-bold big-2">Create New Section</h2>
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
                name: "",
              }}
              validate={(values) => {
                const errors: any = {};

                if (!values.name) {
                  errors.name = "Required";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                register(values.name);
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
                <Form className="w-full flex flex-col gap-2" method="POST">
                  <div className=" mb-4 flex flex-col gap-1 w-full">
                    <p className="text-neutral-dark text-sm">
                      Section Name <span className="text-error">*</span>
                    </p>
                    <div className="relative w-full">
                      <input
                        type="text"
                        value={values.name}
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="px-10 w-full"
                      />
                      <MdLocalOffer
                        className="text-contrast-base absolute top-2.5 left-2"
                        size={"22px"}
                      />
                    </div>
                    <p className="text-error">
                      {errors.name && touched.name && errors.name}
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

export default AddSection;
