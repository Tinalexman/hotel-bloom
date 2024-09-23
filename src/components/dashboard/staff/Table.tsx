import React, { FC, useState } from "react";
import { iStaff } from "@/src/stores/userStore";

import Permissions from "./Permissions";
import UpdateStaff from "./UpdateStaff";
import DeleteStaff from "./DeleteStaff";
import { useDashboardData } from "@/src/stores/dashboardStore";

import { RiEdit2Fill } from "react-icons/ri";
import { TiCancel } from "react-icons/ti";

interface iStaffDetail {
  staff: iStaff | null;
  edit: boolean;
  permission: boolean;
  del: boolean;
}

const Table: FC<{
  staff: iStaff[];
}> = ({ staff }) => {
  const [detail, setDetail] = useState<iStaffDetail>({
    staff: null,
    edit: false,
    permission: false,
    del: false,
  });

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="bg-neutral-light">
            <th className="pl-4">S/N</th>
            <th>USERNAME</th>
            <th>ORGANIZATION</th>
            <th>PERMISSIONS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((st, i) => {
            let count = 0;
            if (st.permissions.create_section) count += 1;
            if (st.permissions.manage_inventory) count += 1;
            // if (st.permissions.manage_staff) count += 1;
            if (st.permissions.view_log) count += 1;
            if (st.permissions.managed_sections.length > 0) count += 1;

            return (
              <tr key={st.id}>
                <td className="pl-4">
                  <h2 className="text-monokai font-medium">{i + 1}.</h2>
                </td>
                <td>
                  <h2 className="text-monokai font-medium">{st.username}</h2>
                </td>
                <td className="text-monokai">{st.organization_name}</td>
                <td>
                  <button
                    onClick={() =>
                      setDetail({ ...detail, staff: st, permission: true })
                    }
                    className="flex gap-2 items-center text-secondary underline font-bold "
                  >
                    {count} permission{count !== 1 ? "s" : ""}
                  </button>
                </td>
                <td className="flex gap-5  w-fit">
                  <div
                    onClick={() =>
                      setDetail({ ...detail, staff: st, edit: true })
                    }
                    className="cursor-pointer bg-[#E4ECF7] rounded size-7 grid place-content-center text-[#292D32]"
                  >
                    <RiEdit2Fill size={20} />
                  </div>
                  <div
                    onClick={() =>
                      setDetail({ ...detail, staff: st, del: true })
                    }
                    className="cursor-pointer bg-[#FDC6C6] rounded size-7 grid place-content-center text-[#D50000]"
                  >
                    <TiCancel size={20} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {detail.staff !== null && detail.permission && (
        <Permissions
          staff={detail.staff}
          onClose={() => {
            useDashboardData.getState().refresh();
            setDetail({ ...detail, staff: null, permission: false });
          }}
        />
      )}
      {detail.staff !== null && detail.edit && (
        <UpdateStaff
          staff={detail.staff}
          onClose={() => setDetail({ ...detail, staff: null, edit: false })}
        />
      )}
      {detail.staff !== null && detail.del && (
        <DeleteStaff
          staff={detail.staff}
          onClose={() => setDetail({ ...detail, staff: null, del: false })}
        />
      )}
    </>
  );
};

export default Table;
