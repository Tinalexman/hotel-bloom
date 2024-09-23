import React, { FC, useEffect } from "react";

import { Modal, Loader } from "@mantine/core";

import { Formik, Form } from "formik";
import { GoNumber } from "react-icons/go";
import { useGetUniqueIcon } from "@/src/hooks/iconHooks";
import { useUpdateInventory } from "@/src/hooks/inventoryHooks";
import { tInventory } from "@/src/stores/inventoryStore";
import { IoMdClose } from "react-icons/io";

const EditItem: FC<{ item: tInventory; onClose: () => void }> = ({
  item,
  onClose,
}) => {
  const { loading, success, update } = useUpdateInventory(item.id);
  const { getIconForId } = useGetUniqueIcon();

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success]);

  const Icon = getIconForId(item.id);

  return (
    <Modal.Root opened={true} onClose={onClose} padding={0} top={0} centered>
      <Modal.Overlay />
      <Modal.Body>
        <Modal.Content>
          <div className="w-full h-fit bg-white shadow-custom-black flex flex-col p-6 gap-4">
            <div className="w-full flex items-center justify-between">
              <div className="w-fit gap-2 items-center flex">
                <h2 className="big-2 font-semibold text-monokai">
                  {item.name}
                </h2>
                <Icon size={"26px"} className="text-secondary" />
              </div>
              <IoMdClose
                className="cursor-pointer text-monokai"
                size={"26px"}
                onClick={onClose}
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
                update(Number(values.quantity));
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
                      Topup Quantity <span className="text-error">*</span>
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
                    {loading ? <Loader color="white" /> : "Top up"}
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

export default EditItem;
