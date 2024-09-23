import React, { FC, useEffect } from "react";

import { Loader, Modal } from "@mantine/core";

import { Formik, Form } from "formik";
import { GoNumber } from "react-icons/go";

import { useCreateInventory } from "@/src/hooks/inventoryHooks";
import { IoMdClose } from "react-icons/io";
import { HiGift } from "react-icons/hi2";

const AddItem: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { loading, success, create } = useCreateInventory();

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
                <h2 className="font-bold big-2">Add New Item</h2>
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
                quantity: "",
              }}
              validate={(values) => {
                const errors: any = {};

                if (!values.name) {
                  errors.name = "Required";
                }

                let v = Number(values.quantity);
                if (isNaN(v) || v <= 0) {
                  errors.quantity = "Invalid amount";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                create({
                  name: values.name,
                  total_quantity: Number(values.quantity),
                });
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
                <Form className="w-full flex flex-col gap-2" method="POST">
                  <div className=" mb-4 flex flex-col gap-1 w-full">
                    <p className="text-neutral-dark text-sm">
                      Item Name <span className="text-error">*</span>
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
                      <HiGift
                        className="text-contrast-base absolute top-2.5 left-2"
                        size={"22px"}
                      />
                    </div>
                    <p className="text-error">
                      {errors.name && touched.name && errors.name}
                    </p>
                  </div>
                  <div className="mb-4 flex flex-col gap-1 w-full relative">
                    <p className="text-neutral-dark text-sm">
                      Quantity <span className="text-error">*</span>
                    </p>
                    <input
                      type="text"
                      value={values.quantity}
                      name="quantity"
                      onChange={(e) => {
                        const res = e.target.value.trim();
                        if (!isNaN(Number(res))) {
                          setFieldValue("quantity", res);
                        }
                      }}
                      onBlur={handleBlur}
                      className="px-10 w-full"
                    />
                    <GoNumber
                      className="text-contrast-base absolute top-7 left-2"
                      size={"26px"}
                    />
                    <p className="text-error">
                      {errors.quantity && touched.quantity && errors.quantity}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={` ${
                      isInitialValid
                        ? "bg-secondary"
                        : isValid
                        ? "bg-secondary"
                        : "bg-neutral-light"
                    } rounded mt-2 w-full h-12 text-white font-semibold text-[16px] leading-[24px] md:leading-[25.6px] items-center flex justify-center`}
                  >
                    {loading ? <Loader color="white" /> : "Add"}
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

export default AddItem;
