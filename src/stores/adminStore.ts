import { create } from "zustand";
import { getRandomInt } from "../functions/base";

export type tAdmin = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  token: string;
  createdAt: string;
};

export const useCurrentAdminStore = create<tAdmin>((set) => ({
  id: `${getRandomInt(1, 1000000)}`,
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@me.com",
  active: true,
  createdAt: "",
  token: "",
}));

type tOtherAdmins = {
  admins: tAdmin[];
};

export const useOtherAdminsStore = create<tOtherAdmins>((set) => ({
  admins: [],
}));

type tAdminStatus = {
  index: number;
  activate: boolean;
};

export const useAdminStatusStore = create<tAdminStatus>((set) => ({
  index: -1,
  activate: false,
}));
