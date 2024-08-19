"use client";

import React, { useEffect, useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { useCurrentAdminStore } from "@/src/stores/adminStore";

import { CgProfile } from "react-icons/cg";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import toast from "react-hot-toast";
import {
  updateAdminData,
  updateAdminPassword,
} from "@/src/services/adminServices";
import { Loader } from "@mantine/core";

const Settings = () => {
  const firstName = useCurrentAdminStore((state) => state.firstName);
  const lastName = useCurrentAdminStore((state) => state.lastName);

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [passwordLoading, setPasswordLoading] = useState<boolean>(false);

  const changeAdminDetails = async () => {
    if (dataLoading) return;

    if (firstName.trim().length === 0) {
      toast.error("Please enter a valid first name");
      return;
    }

    if (lastName.trim().length === 0) {
      toast.error("Please enter a valid last name");
      return;
    }

    setDataLoading(true);

    console.log(useCurrentAdminStore.getState().email);

    try {
      await updateAdminData(
        useCurrentAdminStore.getState().token,
        useCurrentAdminStore.getState().email,
        firstName,
        lastName
      );
      useCurrentAdminStore.setState({
        firstName: firstName,
        lastName: lastName,
      })
      toast.success(`Details updated sucessfully`);
      setDataLoading(false);
    } catch (e) {
      toast.error(`An error occurred while updating your details`);
      setDataLoading(false);
    }
  };

  const changeAdminPasswords = async () => {
    if (passwordLoading) return;

    if (currentPassword.trim().length === 0) {
      toast.error("Please enter your current password");
      return;
    }

    if (newPassword.trim().length === 0) {
      toast.error("Please enter your new password");
      return;
    }

    setPasswordLoading(true);

    try {
      await updateAdminPassword(
        useCurrentAdminStore.getState().token,
        useCurrentAdminStore.getState().email,
        currentPassword,
        newPassword
      );
      setCurrentPassword("");
      setNewPassword("");
      toast.success(`Passwords updated sucessfully`);
      setPasswordLoading(false);
    } catch (e) {
      toast.error(`An error occurred while updating your details`);
      setPasswordLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col pt-10">
      <div className="flex flex-col gap-1">
        <h1 className="big-4">Settings</h1>
        <p className="text-md text-monokai dark:text-white">
          Edit your profile
        </p>
      </div>
      <div className="flex gap-20 items-center w-full mt-10">
        <div className="w-[300px] flex flex-col gap-2 relative">
          <label className="text-md text-neutral-dark dark:text-neutral-light">
            First Name
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            className="pl-10 pr-4"
            value={firstName}
            onChange={(e) => {
              useCurrentAdminStore.setState({ firstName: e.target.value });
            }}
          />
          <CgProfile
            className="text-contrast-base absolute top-[42px] left-2"
            size={"22px"}
          />
        </div>
        <div className="w-[300px] flex flex-col gap-2 relative">
          <label className="text-md text-neutral-dark dark:text-neutral-light">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            className="w-full pl-10 pr-4"
            value={lastName}
            onChange={(e) => {
              useCurrentAdminStore.setState({ lastName: e.target.value });
            }}
          />
          <CgProfile
            className="text-contrast-base absolute top-[42px] left-2"
            size={"22px"}
          />
        </div>
      </div>
      <button
        onClick={changeAdminDetails}
        className="rounded-[10px] w-[120px] mt-5 font-medium flex items-center gap-2 justify-center text-lg bg-primary text-white px-5 py-2 transition-colors duration-300 ease-out"
      >
        {dataLoading ? <Loader color="white" /> : "Save"}
      </button>

      <div className="flex flex-col mt-10 gap-3">
        <h2 className="big-2">Change Password</h2>
        <div className="flex gap-20 items-center">
          <div className="w-[300px] flex flex-col gap-2 relative">
            <label className="text-md text-neutral-dark dark:text-neutral-light">
              Current Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="px-10"
              value={currentPassword}
              placeholder="********"
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
            />

            <RiLockPasswordFill
              className="text-contrast-base absolute top-[42px] left-2"
              size={"22px"}
            />

            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[42px] right-2 text-contrast-base cursor-pointer"
            >
              {showPassword ? (
                <MdVisibilityOff size={"22px"} />
              ) : (
                <MdVisibility size={"22px"} />
              )}
            </div>
          </div>
          <div className="w-[300px] flex flex-col gap-2 relative">
            <label className="text-md text-neutral-dark dark:text-neutral-light">
              New Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="pl-10 pr-4"
              value={newPassword}
              placeholder="********"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            <RiLockPasswordFill
              className="text-contrast-base absolute top-[42px] left-2"
              size={"22px"}
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-[42px] right-2 text-contrast-base cursor-pointer"
            >
              {showConfirmPassword ? (
                <MdVisibilityOff size={"22px"} />
              ) : (
                <MdVisibility size={"22px"} />
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={changeAdminPasswords}
        className="rounded-[10px] w-[120px] mt-5 font-medium flex items-center gap-2 justify-center text-lg bg-primary text-white px-5 py-2 transition-colors duration-300 ease-out"
      >
        {passwordLoading ? <Loader color="white" /> : "Save"}
      </button>
    </div>
  );
};

export default Settings;
