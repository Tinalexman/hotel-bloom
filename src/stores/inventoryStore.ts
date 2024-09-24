export type tInventory = {
  id: string;
  name: string;
  total_quantity: number;
};

export type tSectionInventory = {
  id: string;
  name: string;
  total_quantity: number;
  store_quantity: number;
  organization: string;
  sections: { id: string; name: string; quantity: number; price: number }[];
};
