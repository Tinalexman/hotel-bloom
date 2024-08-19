import { faker } from "@faker-js/faker";

export type tUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  joinedDate: Date;
  service: string;
  product: string;
};

export function createRandomUser(): tUser {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    contact: faker.phone.number(),
    product: faker.commerce.product(),
    service: faker.commerce.product(),
    joinedDate: faker.date.past(),
  };
}

export function createRandomUsers(count: number): tUser[] {
  return faker.helpers.multiple(createRandomUser, {
    count: count,
  });
}
