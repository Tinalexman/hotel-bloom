import React, { FC, useEffect, useState } from "react";

import { Loader, Modal } from "@mantine/core";

import { Formik, Form } from "formik";
import { GoNumber } from "react-icons/go";
import CustomCheckBox from "@/src/components/reusable/CustomCheckbox";

import {
  useGetAllSectionsExcludingUserOrInventory,
  useCreateSectionInventory,
} from "@/src/hooks/sectionHooks";

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
  const { loading: loadingAllSections, data: allSections } =
    useGetAllSectionsExcludingUserOrInventory("", "user");

  const {
    loading: loadingCreatingSectionInventory,
    success: createdSectionInventory,
    create: createSectionInventory,
  } = useCreateSectionInventory();

  useEffect(() => {
    if (!loadingCreatingSectionInventory && createdSectionInventory) {
      onClose();
    }
  }, [loadingCreatingSectionInventory, createdSectionInventory]);

  const [currentSectionID, setCurrentSectionID] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);

  return (
    <Modal.Root opened={true} onClose={onCancel} padding={0} top={0} centered>
      <Modal.Overlay />

      <Modal.Body>
        <Modal.Content>
          <div className="w-full p-6 bg-white text-monokai flex flex-col gap-5 items-center">
            <div className="w-full">
              <div className=" justify-between items-center flex w-full">
                <h2 className="font-bold big-2">Add New Section Inventory</h2>
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
                section: "",
                quantity: "",
                price: "",
              }}
              validate={(values) => {
                const errors: any = {};

                if (currentPage === 0) {
                  if (!values.section) {
                    errors.section = "Section is required";
                  }
                }

                if (currentPage === 1) {
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
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                createSectionInventory({
                  section: currentSectionID,
                  inventory: "",
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
                  {currentPage === 0 && (
                    <div className="flex flex-col gap-1">
                      <p className="text-neutral-dark text-sm font-semibold">
                        SECTIONS <span className="text-error">*</span>
                      </p>
                      {loadingAllSections && (
                        <div className="w-full h-40 grid place-content-center">
                          <Loader color="myColor.6" />
                        </div>
                      )}
                      <div className="flex flex-col gap-1.5 w-full">
                        {allSections.map((s, i) => (
                          <div
                            key={i}
                            className="w-full flex justify-between items-center"
                          >
                            <p className="w-full">{s.name}</p>
                            <CustomCheckBox
                              value={currentSectionID === s.id}
                              onChange={() => {
                                setCurrentSectionID(s.id);
                                setFieldValue("section", s.name);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentPage === 1 && (
                    <>
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
                              setFieldValue(
                                "price",
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
                          {errors.quantity &&
                            touched.quantity &&
                            errors.quantity}
                        </p>
                      </div>
                    </>
                  )}

                  {currentPage === 0 && (
                    <button
                      onClick={() => setCurrentPage(1)}
                      className={` ${
                        isValid ? "bg-secondary" : "bg-neutral-light"
                      } rounded mt-2 w-full h-12 text-white font-semibold text-[16px] leading-[24px] md:leading-[25.6px] items-center flex justify-center`}
                    >
                      Next
                    </button>
                  )}

                  {currentPage === 1 && (
                    <div className="w-full gap-5 grid grid-cols-2 mt-2">
                      <button
                        onClick={() => setCurrentPage(0)}
                        className={`
                      } rounded border border-monokai rounded w-full h-12 text-monokai font-semibold text-[16px] leading-[24px] md:leading-[25.6px] items-center flex justify-center`}
                      >
                        Go Back
                      </button>
                      <button
                        type="submit"
                        className={` ${
                          isValid ? "bg-secondary" : "bg-neutral-light"
                        } rounded w-full h-12 text-white font-semibold text-[16px] leading-[24px] md:leading-[25.6px] items-center flex justify-center`}
                      >
                        {loadingCreatingSectionInventory ? (
                          <Loader color="white" />
                        ) : (
                          "Create"
                        )}
                      </button>
                    </div>
                  )}
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
