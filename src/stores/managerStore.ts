import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getRandomInt } from "../functions/base";

export type tManager = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  active: boolean;
  createdAt: string;
  token: string;
  categoryId: string;
};

export const useCurrentManagerStore = create<tManager>()(
  persist(
    (set, get) => ({
      id: `${getRandomInt(1, 1000000)}`,
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@me.com",
      businessName: "Sure Agro",
      categoryId: "",
      active: true,
      createdAt: "",
      token: "",
    }),
    {
      name: "sau",
    }
  )
);
