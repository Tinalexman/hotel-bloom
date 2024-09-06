import { tSectionAccess } from "./sectionStore";

import { faker } from "@faker-js/faker";

export type tPermission = {
  name: string;
  value: boolean;
};

export type tStaff = {
  id: string;
  username: string;
  organization: string;
  permissions: tPermission[];
  managedSections: tSectionAccess[];
  createdAt: string;
};

export function createRandomStaffs(count: number): tStaff[] {
  let staffs: tStaff[] = [];
  for (let i = 0; i < count; i++) {
    staffs.push(createRandomStaff());
  }
  return staffs;
}

function createRandomStaff(): tStaff {
  return {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    organization: faker.company.name(),
    permissions: [
      {
        name: "View Logs",
        value: faker.datatype.boolean(),
      },
      {
        name: "Create Sections",
        value: faker.datatype.boolean(),
      },
      {
        name: "Manage Inventory",
        value: faker.datatype.boolean(),
      },
      {
        name: "Manage Staff",
        value: faker.datatype.boolean(),
      },
    ],
    managedSections: [
      {
        section: faker.string.uuid(),
        view: faker.datatype.boolean(),
        update: faker.datatype.boolean(),
      },
    ],
    createdAt: faker.date.past().toISOString(),
  };
}
