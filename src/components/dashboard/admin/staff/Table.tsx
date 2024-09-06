import { convertDate } from "@/src/functions/dateFunctions";
import React, { FC, useState } from "react";
import { FaStreetView } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import Image from "next/image";
import { tStaff } from "@/src/stores/staffStore";

import Permissions from "./Permissions";

const Table: FC<{
  staff: tStaff[];
}> = ({ staff }) => {
  const [currentStaff, setCurrentStaff] = useState<tStaff | null>(null);

  return (
    <>
      <table className="w-full">
        <thead>
          <tr>
            <th>S/N</th>
            <th>USERNAME</th>
            <th>DATE JOINED</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((st, i) => {
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
                <td className="text-monokai">{convertDate(st.createdAt)}</td>
                <td className="flex items-center gap-4 w-fit">
                  <button
                    onClick={() => setCurrentStaff(st)}
                    className="flex gap-2 text-monokai items-center font-medium hover:bg-secondary hover:bg-opacity-10 px-2.5 py-1.5 rounded-xl transition-all duration-200 ease-out"
                  >
                    <FaStreetView size={14} />
                    View Permissions
                  </button>
                  <button className="flex gap-2 text-monokai items-center font-medium hover:bg-secondary hover:bg-opacity-10 px-2.5 py-1.5 rounded-xl transition-all duration-200 ease-out">
                    <MdEdit size={14} />
                    Edit Staff
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
