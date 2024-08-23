"use client";
import { useUpdateManagerPassword } from "@/src/hooks/settingsHooks";
import { useCurrentManagerStore } from "@/src/stores/managerStore";
import { Loader } from "@mantine/core";
import React, { useState } from "react";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const Passwords = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const { loading, update } = useUpdateManagerPassword();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-3">
        <h2 className="big-2">Change Password</h2>
        <div className="grid grid-cols-3 gap-10 items-center">
          <div className="w-full flex flex-col gap-2 relative">
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
          <div className="w-full flex flex-col gap-2 relative">
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
        onClick={() => {
          const email = useCurrentManagerStore.getState().email;
          update(email, currentPassword, newPassword);
        }}
        className="rounded-[10px] w-[120px] mt-5 font-medium flex items-center gap-2 justify-center text-lg bg-primary text-white px-5 py-2 transition-colors duration-300 ease-out"
      >
        {loading ? <Loader color="white" /> : "Save"}
      </button>
    </div>
  );
};

export default Passwords;
