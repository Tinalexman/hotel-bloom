import React, { FC, useEffect } from "react";

import { Modal, Loader } from "@mantine/core";

import { Formik, Form } from "formik";
import { GoNumber } from "react-icons/go";
import { useSellSectionInventory } from "@/src/hooks/sectionHooks";
import { tSectionInventory } from "@/src/stores/sectionStore";
import { IoMdClose } from "react-icons/io";

const SellInventoryItem: FC<{
  item: tSectionInventory;
  onClose: () => void;
  onCancel: () => void;
}> = ({ item, onClose, onCancel }) => {
  const { loading, success, sell } = useSellSectionInventory(item.id);
  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success]);

  return (
    <Modal.Root opened={true} onClose={onCancel} padding={0} top={0} centered>
      <Modal.Overlay />
      <Modal.Body>
        <Modal.Content>
          <div className="w-full h-fit bg-white shadow-custom-black flex flex-col p-6 gap-4">
            <div className="w-full flex items-center justify-between">
              <h2 className="big-2 font-semibold text-monokai">{item.name}</h2>
              <IoMdClose
                className="cursor-pointer text-monokai"
                size={"26px"}
                onClick={onCancel}
              />
            </div>
            <Formik
              initialValues={{
                quantity: "",
              }}
              validate={(values) => {
                const errors: any = {};

                let v = Number(values.quantity);
                if (isNaN(v) || v <= 0) {
                  errors.quantity = "Invalid amount";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                sell(Number(values.quantity));
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
                <Form
                  className="w-full flex flex-col gap-2 bg-white"
                  method="POST"
                >
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
                      className="text-contrast-base absolute top-[1.85rem] left-2"
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
                    {loading ? <Loader color="white" /> : "Sell"}
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

export default SellInventoryItem;
