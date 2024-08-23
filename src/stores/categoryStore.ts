import { IconType } from "react-icons";

export type tCategory = {
  id: string;
  name: string;
  contents: {
    title: string;
    body: string;
  }[];
  color: string;
  icon: IconType;
};

export type tServerCategory = {
  id: string;
  name: string;
  totalItems: number;
  tagColor: string;
  svgIcon: string;
  createdAt: string;
};
