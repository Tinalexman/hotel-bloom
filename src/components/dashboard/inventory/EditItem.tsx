import React, { FC, useEffect } from "react";

import { Loader } from "@mantine/core";

import { Formik, Form } from "formik";
import { GoNumber } from "react-icons/go";

import { useUpdateInventory } from "@/src/hooks/inventoryHooks";
import { tInventory } from "@/src/stores/inventoryStore";

const EditItem: FC<{ item: tInventory; onClose: () => void }> = ({
  item,
  onClose,
}) => {
  const { loading, success, update } = useUpdateInventory(item.id);

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success]);

  return (
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
        <Form className="w-full flex flex-col gap-2 bg-white" method="POST">
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
              className="text-contrast-base absolute top-[1.8rem] left-2"
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
            {loading ? <Loader color="white" /> : "Update"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditItem;
