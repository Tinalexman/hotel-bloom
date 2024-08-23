import { numberToFixedLengthHex, getRandomInt } from "@/src/functions/base";
import { convertDate } from "@/src/functions/dateFunctions";
import { tAdmin } from "@/src/stores/adminStore";
import React, { FC } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdOutlineCancel, MdOutlineDone } from "react-icons/md";
import ReactPaginate from "react-paginate";
import Image from "next/image";

const Table: FC<{
  admins: tAdmin[];
  openStatus: (index: number, activate: boolean) => void;
  handlePageClick: (event: any) => void;
  totalPages: number;
}> = ({ admins, openStatus, handlePageClick, totalPages }) => {
  return (
    <>
      <table className="w-full">
        <thead>
          <tr>
            <th>S/N</th>
            <th>NAME</th>
            <th>STATUS</th>
            <th>DATE JOINED</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, i) => {
            let hexCode = `#${numberToFixedLengthHex(
              getRandomInt(0, 16777215)
            )}`;
            return (
              <tr key={admin.id} className="">
                <td>
                  <h2 className="text-lg text-monokai dark:text-white font-medium">
                    {i + 1}.
                  </h2>
                </td>
                <td className="">
                  <div className="flex gap-3 w-fit items-center">
                    <Image
                      src={`https://gravatar.com/avatar/${admin.id}?s=400&d=robohash&r=x`}
                      alt="admin-picture"
                      width={50}
                      height={50}
                      className={`object-cover size-10 rounded-[10px] bg-[${hexCode}] dark:shadow-custom-white shadow-custom-black`}
                    />
                    <div className="flex flex-col">
                      <h2 className="text-lg text-monokai dark:text-white font-medium">
                        {admin.firstName} {admin.lastName}
                      </h2>
                      <p className="text-sm text-neutral-dark dark:text-neutral-light">
                        {admin.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="">
                  <p
                    className={`${
                      admin.active ? "text-primary" : "text-error"
                    }`}
                  >
                    {admin.active ? "Active" : "Disabled"}
                  </p>
                </td>
                <td className="">{convertDate(admin.createdAt)}</td>
                <td className="">
                  <div className="flex w-fit gap-5">
                    <div
                      onClick={() => {
                        if (admin.active) {
                          openStatus(i, false);
                        }
                      }}
                      className={`flex ${
                        admin.active
                          ? "hover:bg-error-20 text-neutral-dark dark:text-neutral-light cursor-pointer"
                          : "text-gray-500 cursor-not-allowed"
                      } py-1 px-2 rounded-[10px] w-fit gap-1 items-center transition-all duration-100 ease-out`}
                    >
                      <MdOutlineCancel />
                      Disable
                    </div>

                    <div
                      onClick={() => {
                        if (!admin.active) {
                          openStatus(i, true);
                        }
                      }}
                      className={`flex ${
                        !admin.active
                          ? "hover:bg-primary-20 text-neutral-dark dark:text-neutral-light cursor-pointer"
                          : "text-gray-500 cursor-not-allowed"
                      } py-1 px-2 rounded-[10px] w-fit gap-1 items-center transition-all duration-100 ease-out`}
                    >
                      <MdOutlineDone />
                      Enable
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-[45px] w-full flex justify-end items-end">
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <IoIosArrowForward
              className="text-monokai dark:text-white"
              size={"22px"}
            />
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel={
            <IoIosArrowBack
              className="text-monokai dark:text-white"
              size={"22px"}
            />
          }
          renderOnZeroPageCount={null}
          className="flex gap-2 items-center w-fit"
        />
      </div>
    </>
  );
};

export default Table;
