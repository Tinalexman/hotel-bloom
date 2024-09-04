import { numberToFixedLengthHex, getRandomInt } from "@/src/functions/base";
import { convertDate } from "@/src/functions/dateFunctions";
import React, { FC } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdOutlineCancel, MdOutlineDone } from "react-icons/md";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import { tStaff } from "@/src/stores/staffStore";

const Table: FC<{
  staff: tStaff[];
}> = ({ staff }) => {
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
                  <h2 className="text-lg text-white font-medium">{i + 1}.</h2>
                </td>
                <td>
                  <div className="flex gap-3 w-fit items-center">
                    <Image
                      src={`https://gravatar.com/avatar/${st.id}?s=400&d=robohash&r=x`}
                      alt="admin-picture"
                      width={50}
                      height={50}
                      className={`object-cover size-10 rounded-[10px] shadow-custom-white`}
                    />
                    <h2 className="text-lg text-white font-medium">
                      {st.username}
                    </h2>
                  </div>
                </td>
                <td>{convertDate(st.createdAt)}</td>
                <td className="flex items-center gap-2 w-fit">
                  <button className="text-white large-1 font-semibold bg-primary rounded px-3 py-2">
                    View Permissions
                  </button>
                  <button className="text-white large-1 font-semibold bg-primary rounded px-3 py-2">
                    Edit Staff
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
