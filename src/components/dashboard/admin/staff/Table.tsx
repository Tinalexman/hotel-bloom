import { convertDate } from "@/src/functions/dateFunctions";
import React, { FC, useState } from "react";
import { FaStreetView } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import Image from "next/image";
import { iStaff } from "@/src/stores/userStore";

import Permissions from "./Permissions";

const Table: FC<{
  staff: iStaff[];
}> = ({ staff }) => {
  const [currentStaff, setCurrentStaff] = useState<iStaff | null>(null);

  return (
    <>
      <table className="w-full">
        <thead>
          <tr>
            <th>S/N</th>
            <th>USERNAME</th>
            <th>ORGANIZATION</th>
            <th>PERMISSIONS</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((st, i) => {
            let count = 0;
            if (st.permissions.create_section) count += 1;
            if (st.permissions.manage_inventory) count += 1;
            if (st.permissions.manage_staff) count += 1;
            if (st.permissions.view_log) count += 1;

            return (
              <tr key={st.id}>
                <td>
                  <h2 className="text-monokai font-medium">{i + 1}.</h2>
                </td>
                <td>
                  <div className="flex gap-2 w-fit items-center">
                    <Image
                      src={`https://gravatar.com/avatar/${st.id}?s=400&d=robohash&r=x`}
                      alt="admin-picture"
                      width={40}
                      height={40}
                      className={`object-cover size-10 rounded-[10px] shadow-custom-dark`}
                    />
                    <h2 className="text-monokai font-medium">{st.username}</h2>
                  </div>
                </td>
                <td className="text-monokai">{st.organization_name}</td>
                <td className="flex w-fit gap-3 items-center">
                  <p className="text-monokai">{count} permissions</p>
                  <button
                    onClick={() => setCurrentStaff(st)}
                    className="flex gap-2 items-center font-bold text-secondary "
                  >
                    Modify
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {currentStaff !== null && (
        <Permissions
          staff={currentStaff}
          onClose={() => setCurrentStaff(null)}
        />
      )}
    </>
  );
};

export default Table;
