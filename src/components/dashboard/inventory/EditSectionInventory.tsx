import React, { FC, useEffect, useState } from "react";

import { Loader, Modal } from "@mantine/core";

import { Formik, Form } from "formik";
import { GoNumber } from "react-icons/go";
import CustomCheckBox from "@/src/components/reusable/CustomCheckbox";

import { useUpdateSectionInventory } from "@/src/hooks/sectionHooks";

import { IoMdClose } from "react-icons/io";
import { formatAmountWithCommas } from "@/src/functions/numberFunctions";

const EditSectionInventory: FC<{
  section: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  };
  onClose: () => void;
  onCancel: () => void;
}> = ({ section, onClose, onCancel }) => {
  const { loading, success, update } = useUpdateSectionInventory(section.id);

  useEffect(() => {
    if (!loading && success) {
      onClose();
    }
  }, [loading, success]);

  return (
    <Modal.Root opened={true} onClose={onCancel} padding={0} top={0} centered>
      <Modal.Overlay />

      <Modal.Body>
        <Modal.Content>
          <div className="w-full p-6 bg-white text-monokai flex flex-col gap-5 items-center">
            <div className="w-full">
              <div className=" justify-between items-center flex w-full">
                <h2 className="font-bold big-2">Update Section Inventory</h2>
                <IoMdClose
                  className="cursor-pointer text-monokai"
                  size={"26px"}
                  onClick={onCancel}
                />
              </div>
              <p className="text-neutral-dark text-lg">
                Fields marked with <span className="text-error">*</span> are
                required
              </p>
            </div>
            <Formik
              initialValues={{
                quantity: formatAmountWithCommas(section.quantity),
                price: formatAmountWithCommas(
                  Number.parseInt(section.price.toString())
                ),
              }}
              validate={(values) => {
                const errors: any = {};

                let v = Number(values.quantity.replace(/,/g, ""));
                if (isNaN(v)) {
                  errors.quantity = "Invalid quantity";
                } else if (v <= 0) {
                  errors.quantity = "Quantity must be greater than 0";
                }

                v = Number(values.price.replace(/,/g, ""));
                if (isNaN(v)) {
                  errors.price = "Invalid price";
                } else if (v <= 0) {
                  errors.price = "Price must be greater than 0";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                update({
                  price: Number.parseInt(
                    values.price.toString().replace(/,/g, "")
                  ),
                  quantity: Number.parseInt(
                    values.quantity.toString().replace(/,/g, "")
                  ),
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
                  <div className="mb-4 flex flex-col gap-1 w-full relative">
                    <p className="text-neutral-dark text-sm">
                      Price <span className="text-error">*</span>
                    </p>
                    <input
                      type="text"
                      value={values.price}
                      name="price"
                      onChange={(e) => {
                        const res = e.target.value.trim().replace(/,/g, "");
                        if (!isNaN(Number(res))) {
                          setFieldValue("price", formatAmountWithCommas(res));
                        }
                      }}
                      onBlur={handleBlur}
                      className="px-10 w-full"
                    />
                    <GoNumber
                      className="text-contrast-base absolute top-[1.85rem] left-2"
                      size={"26px"}
                    />
                    <p className="text-error">
                      {errors.price && touched.price && errors.price}
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
                        const res = e.target.value.trim().replace(/,/g, "");
                        if (!isNaN(Number(res))) {
                          setFieldValue(
                            "quantity",
                            formatAmountWithCommas(res)
                          );
                        }
                      }}
                      onBlur={handleBlur}
                      className="px-10 w-full"
                    />
                    <GoNumber
                      className="text-contrast-base absolute top-[1.85rem] left-2"
                      size={"26px"}
                    />
                    <p className="text-error">
                      {errors.quantity && touched.quantity && errors.quantity}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className={` ${
                      isValid ? "bg-secondary" : "bg-neutral-light"
                    } rounded w-full h-12 mt-2 text-white font-semibold text-[16px] leading-[24px] md:leading-[25.6px] items-center flex justify-center`}
                  >
                    {loading ? <Loader color="white" /> : "Update"}
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

export default EditSectionInventory;
