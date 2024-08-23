"use client";

import React, { useEffect, useState } from "react";

import { useDashboardData } from "@/src/stores/dashboardStore";
import { LiaFilterSolid } from "react-icons/lia";
import { IoAdd } from "react-icons/io5";
import { tUser, createRandomUsers } from "./types";
import { convertDateWithJustSlashes } from "@/src/functions/dateFunctions";
import { Loader } from "@mantine/core";

const Partners = () => {
  const [users, setUsers] = useState<tUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setUsers(createRandomUsers(8));
    setLoading(false);
  }, []);

  return (
    <div className="w-full h-full pt-10 flex flex-col ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h2 className="big-4 font-medium">
            Partners <span className="big-3 font-bold">({users.length})</span>
          </h2>
          <p className="text-md text-monokai dark:text-white">
            Manage all your partners
          </p>
        </div>
        <div className="w-fit flex gap-5">
          <button className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-neutral-light dark:bg-neutral-dark text-monokai dark:text-white px-5 py-2">
            <LiaFilterSolid size={"26px"} />
            Filters
          </button>

          <button className="rounded-[10px] font-medium flex items-center gap-2 justify-center text-lg bg-primary dark:text-white px-5 py-2">
            <IoAdd size={"26px"} />
            Add Partner
          </button>
        </div>
      </div>
      {!loading && (
        <div className="w-full h-[65vh] pt-10 overflow-y-scroll scrollbar-custom">
          {users.length > 0 && (
            <table className="w-full">
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Service</th>
                <th>Product</th>
                <th>Joined Date</th>
              </tr>
              {users.map((user, i) => (
                <tr key={user.id}>
                  <td>
                    <h2 className="text-lg text-monokai dark:text-white font-medium">
                      {i + 1}.
                    </h2>
                  </td>
                  <td>
                    <div>
                      <h2 className="text-lg text-monokai dark:text-white font-medium">
                        {user.firstName} {user.lastName}
                      </h2>
                      <p className="text-sm text-neutral-dark dark:text-neutral-light">
                        {user.email}
                      </p>
                    </div>
                  </td>
                  <td>{user.contact}</td>
                  <td>{user.service}</td>
                  <td>{user.product}</td>
                  <td>{convertDateWithJustSlashes(user.joinedDate)}</td>
                </tr>
              ))}
            </table>
          )}
        </div>
      )}
      {loading && (
        <div className="w-full h-full flex justify-center items-center">
          <Loader color="myColor.9" />
        </div>
      )}
    </div>
  );
};

export default Partners;
