import React from "react";

import Details from "./Details";
import Passwords from "./Passwords";

const Settings = () => {
  return (
    <div className="w-full h-full flex flex-col mt-10 gap-10">
      <div className="flex flex-col gap-1">
        <h1 className="big-4">Settings</h1>
        <p className="text-md text-monokai dark:text-white">
          Edit your profile
        </p>
      </div>

      <Details />
      <Passwords />
    </div>
  );
};

export default Settings;
