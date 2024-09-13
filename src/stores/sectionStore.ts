export type tSection = {
  id: string;
  name: string;
  inventories: tSectionInventory[];
};

export type tSectionAccess = {
  section: string;
  view: boolean;
  update: boolean;
};

export type tSectionInventory = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};
