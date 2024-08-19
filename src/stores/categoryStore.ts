import { create } from "zustand";
import { tServerCategory } from "../components/dashboard/categories/types";

export type tCategoryData = {
  categories: tServerCategory[];
  viewIndex: number;
};

export const useCategoryData = create<tCategoryData>((set) => ({
  categories: [],
  viewIndex: -1,
}));
