"use client";

import React, { useState } from "react";
import { useCurrentManagerStore } from "@/src/stores/managerStore";

import { CgProfile } from "react-icons/cg";
import { Loader } from "@mantine/core";
import { useUpdateManagerData } from "@/src/hooks/settingsHooks";

import { BiSolidBusiness } from "react-icons/bi";

const Details = () => {
  const [firstName, setFirstName] = useState<string>(
    useCurrentManagerStore((state) => state.firstName)
  );
  const [lastName, setLastName] = useState<string>(
    useCurrentManagerStore((state) => state.lastName)
  );
  const [businessName, setBusinessName] = useState<string>(
    useCurrentManagerStore((state) => state.businessName)
  );

  const { loading, update } = useUpdateManagerData();

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 gap-10 items-center w-full">
        <div className="w-full flex flex-col gap-2 relative">
          <label className="text-md text-neutral-dark dark:text-neutral-light">
            First Name
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            className="pl-10 pr-4"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <CgProfile
            className="text-contrast-base absolute top-[42px] left-2"
            size={"22px"}
          />
        </div>
        <div className="w-full flex flex-col gap-2 relative">
          <label className="text-md text-neutral-dark dark:text-neutral-light">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            className="w-full pl-10 pr-4"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <CgProfile
            className="text-contrast-base absolute top-[42px] left-2"
            size={"22px"}
          />
        </div>
        <div className="w-full flex flex-col gap-2 relative">
          <label className="text-md text-neutral-dark dark:text-neutral-light">
            Business Name
          </label>
          <input
            type="text"
            placeholder="Enter your business name"
            className="w-full pl-10 pr-4"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <BiSolidBusiness
            className="text-contrast-base absolute top-[42px] left-2"
            size={"22px"}
          />
        </div>
      </div>
      <button
        onClick={() => {
          const email = useCurrentManagerStore.getState().email;
          update(email, firstName, lastName, businessName, () => {
            useCurrentManagerStore.setState({
              firstName: firstName,
              lastName: lastName,
              businessName: businessName,
            });
          });
        }}
        className="rounded-[10px] w-[120px] mt-5 font-medium flex items-center gap-2 justify-center text-lg bg-primary text-white px-5 py-2 transition-colors duration-300 ease-out"
      >
        {loading ? <Loader color="white" /> : "Save"}
      </button>
    </div>
  );
};

export default Details;
