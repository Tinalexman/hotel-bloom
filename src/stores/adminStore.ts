import { create } from "zustand";
import { persist } from "zustand/middleware";
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

export const useCurrentAdminStore = create<tAdmin>()(
  persist(
    (set, get) => ({
      id: `${getRandomInt(1, 1000000)}`,
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@me.com",
      active: true,
      createdAt: "",
      token: "",
    }),
    {
      name: "svx",
    }
  )
);
