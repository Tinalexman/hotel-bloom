import { faker } from "@faker-js/faker";
import { getRandomInt, numberToFixedLengthHex } from "@/src/functions/base";

import * as TbIcons from "react-icons/tb";
import { IconType } from "react-icons";

const allIcons: IconType[] = Object.values(TbIcons);

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

export function createRandomCategory(): tCategory {
  let hexCode = `#${numberToFixedLengthHex(getRandomInt(0, 16777215))}`;
  return {
    id: faker.string.uuid(),
    name: faker.commerce.product(),
    contents: Array(getRandomInt(5, 14)).fill({
      title: faker.commerce.productName(),
      body: faker.commerce.productDescription(),
    }),
    color: hexCode,
    icon: getRandomIcon(),
  };
}

export function createRandomCategories(count: number): tCategory[] {
  return faker.helpers.multiple(createRandomCategory, {
    count: count,
  });
}

export function getRandomIcon(): IconType {
  const randomIndex = Math.floor(Math.random() * allIcons.length);
  return allIcons[randomIndex];
}
