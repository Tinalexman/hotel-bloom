import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface iStaff {
  id: string;
  username: string;
  organization: string;
  organization_name: string;
  permissions: {
    view_log: boolean;
    create_section: boolean;
    manage_inventory: boolean;
    manage_staff: boolean;
    managed_sections: {
      section: string;
      view_access: boolean;
      update_access: boolean;
      section_name: string;
    }[];
  };
}

export const useCurrentStaffStore = create<iStaff>()(
  persist(
    (set, get) => ({
      id: "",
      username: "",
      organization: "",
      organization_name: "",
      permissions: {
        view_log: false,
        create_section: false,
        manage_inventory: false,
        manage_staff: false,
        managed_sections: [],
      },
    }),
    {
      name: "svx",
    }
  )
);

export function clearStaffData() {
  useCurrentStaffStore.setState({
    id: "",
    username: "",
    organization: "",
    organization_name: "",
    permissions: {
      view_log: false,
      create_section: false,
      manage_inventory: false,
      manage_staff: false,
      managed_sections: [],
    },
  });
}
